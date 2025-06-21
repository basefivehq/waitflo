-- Create users table
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    name text,
    role text DEFAULT 'user' NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Create pages table
CREATE TABLE pages (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    title text,
    slug text UNIQUE,
    config jsonb,
    html text,
    published boolean DEFAULT false,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create faqs table
CREATE TABLE faqs (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    page_id bigint REFERENCES pages(id) ON DELETE CASCADE,
    question text,
    answer text,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Create referrals table
CREATE TABLE referrals (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    page_id bigint REFERENCES pages(id) ON DELETE CASCADE,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    ref_code text UNIQUE,
    count integer DEFAULT 0,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Create subscriptions table
CREATE TABLE subscriptions (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    page_id bigint REFERENCES pages(id) ON DELETE CASCADE,
    email text NOT NULL,
    subscribed_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(page_id, email)
);

-- Create onboarding_responses table
CREATE TABLE onboarding_responses (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    page_id bigint REFERENCES pages(id) ON DELETE CASCADE,
    email text NOT NULL,
    questions jsonb,
    answers jsonb,
    completed_at timestamptz DEFAULT now() NOT NULL
);

-- RLS Policies for pages
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own pages"
ON pages
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pages"
ON pages
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pages"
ON pages
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pages"
ON pages
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Public pages are viewable by everyone"
ON pages
FOR SELECT
USING (published = true);

-- RLS Policies for users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data"
ON users
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
ON users
FOR UPDATE
USING (auth.uid() = id);

-- RLS Policies for faqs
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "FAQs are viewable by everyone"
ON faqs
FOR SELECT
USING (true);

-- RLS Policies for subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Page owners can view their page subscriptions"
ON subscriptions
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM pages 
        WHERE pages.id = subscriptions.page_id 
        AND pages.user_id = auth.uid()
    )
);

CREATE POLICY "Anyone can subscribe to published pages"
ON subscriptions
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM pages 
        WHERE pages.id = subscriptions.page_id 
        AND pages.published = true
    )
);

-- RLS Policies for onboarding_responses
ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Page owners can view their page onboarding responses"
ON onboarding_responses
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM pages 
        WHERE pages.id = onboarding_responses.page_id 
        AND pages.user_id = auth.uid()
    )
);

CREATE POLICY "Anyone can submit onboarding responses for published pages"
ON onboarding_responses
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM pages 
        WHERE pages.id = onboarding_responses.page_id 
        AND pages.published = true
    )
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_pages_updated_at 
    BEFORE UPDATE ON pages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 