# User Dashboard Backend Implementation

This document outlines the complete backend implementation for the user dashboard functionality in the Waitly platform.

## Overview

The user dashboard backend provides comprehensive functionality for managing waitlist pages, email automation, API keys, analytics, and templates. All endpoints require user authentication and ensure data isolation between users.

## API Endpoints

### 1. Email Automation (`/api/user/emails`)

#### GET `/api/user/emails`
Retrieves user's email automation settings for all their pages.

**Response:**
```json
{
  "success": true,
  "emailSettings": [
    {
      "pageId": 1,
      "pageTitle": "My Startup Launch",
      "emailAutomation": {
        "welcomeEmail": {
          "enabled": true,
          "subject": "Welcome to our waitlist!",
          "body": "Thanks for joining our waitlist...",
          "delay": 0
        },
        "referralEmail": {
          "enabled": true,
          "subject": "You've unlocked a reward!",
          "body": "Congratulations! You've referred someone...",
          "delay": 0
        },
        "reminderEmail": {
          "enabled": false,
          "subject": "Don't forget about us!",
          "body": "We're making great progress...",
          "delay": 7
        },
        "milestoneEmail": {
          "enabled": true,
          "subject": "Milestone reached!",
          "body": "You've reached a referral milestone...",
          "delay": 0
        }
      }
    }
  ]
}
```

#### PUT `/api/user/emails`
Updates email automation settings for a specific page and email type.

**Request Body:**
```json
{
  "pageId": 1,
  "emailType": "welcomeEmail",
  "settings": {
    "enabled": true,
    "subject": "Welcome to our waitlist!",
    "body": "Thanks for joining...",
    "delay": 0
  }
}
```

#### POST `/api/user/emails`
Sends a test email to verify email configuration.

**Request Body:**
```json
{
  "pageId": 1,
  "emailType": "welcomeEmail",
  "testEmail": "test@example.com"
}
```

### 2. API Keys Management (`/api/user/api-keys`)

#### GET `/api/user/api-keys`
Retrieves user's API keys and webhook settings for all their pages.

**Response:**
```json
{
  "success": true,
  "apiKeys": [
    {
      "pageId": 1,
      "pageTitle": "My Startup Launch",
      "apiKeys": [
        {
          "id": "key_123",
          "name": "Production API Key",
          "key": "wly_1234567890abcdef",
          "created": "2024-01-15T10:30:00Z",
          "lastUsed": "2024-01-16T14:30:00Z",
          "permissions": ["read", "write"],
          "status": "active"
        }
      ]
    }
  ],
  "webhookSettings": [
    {
      "pageId": 1,
      "pageTitle": "My Startup Launch",
      "webhookUrl": "https://api.example.com/webhooks",
      "webhookEvents": [
        { "name": "signup.created", "enabled": true },
        { "name": "referral.completed", "enabled": true },
        { "name": "milestone.reached", "enabled": false }
      ]
    }
  ]
}
```

#### POST `/api/user/api-keys`
Creates a new API key for a specific page.

**Request Body:**
```json
{
  "pageId": 1,
  "name": "Production API Key",
  "permissions": ["read", "write"]
}
```

#### PUT `/api/user/api-keys`
Updates API key settings or webhook configuration.

**Request Body:**
```json
{
  "pageId": 1,
  "type": "webhook",
  "data": {
    "webhookUrl": "https://api.example.com/webhooks",
    "webhookEvents": [...]
  }
}
```

#### DELETE `/api/user/api-keys?pageId={pageId}&keyId={keyId}`
Deletes an API key.

### 3. Templates Management (`/api/user/templates`)

#### GET `/api/user/templates`
Retrieves available templates and user's saved templates.

**Response:**
```json
{
  "success": true,
  "availableTemplates": {
    "business": [
      {
        "id": "startup-launch",
        "name": "Startup Launch",
        "description": "Perfect for announcing your new startup",
        "category": "Business",
        "image": "/placeholder.svg?height=200&width=300",
        "config": {
          "theme": "modern",
          "colors": { "primary": "#6366f1", "secondary": "#8b5cf6" },
          "sections": ["hero", "features", "testimonials", "cta"],
          "industry": "startup"
        }
      }
    ],
    "mobile": [...],
    "marketing": [...],
    "content": [...],
    "events": [...]
  },
  "savedTemplates": [
    {
      "pageId": 1,
      "pageTitle": "My Startup Launch",
      "template": "startup-launch"
    }
  ]
}
```

#### POST `/api/user/templates`
Applies a template to a specific page.

**Request Body:**
```json
{
  "pageId": 1,
  "templateId": "startup-launch"
}
```

### 4. Analytics (`/api/user/analytics`)

#### GET `/api/user/analytics`
Retrieves comprehensive analytics data for all user's pages.

**Response:**
```json
{
  "success": true,
  "overview": {
    "totalPages": 3,
    "publishedPages": 2,
    "totalSignups": 1247,
    "totalOnboarding": 892,
    "totalViews": 12847,
    "avgConversion": "9.7%",
    "recentSignups": 45,
    "recentOnboarding": 23
  },
  "dailyData": [
    {
      "day": "Mon",
      "signups": 12,
      "onboarding": 8
    }
  ],
  "topPages": [
    {
      "id": 1,
      "title": "My Startup Launch",
      "signups": 892,
      "conversion": 9.7,
      "url": "my-startup.waitly.co"
    }
  ],
  "recentSignups": [
    {
      "id": 1,
      "email": "user@example.com",
      "subscribed_at": "2024-01-16T14:30:00Z",
      "pageTitle": "My Startup Launch",
      "pageSlug": "my-startup"
    }
  ]
}
```

#### GET `/api/user/analytics?pageId={pageId}`
Retrieves analytics for a specific page.

**Response:**
```json
{
  "success": true,
  "page": {
    "id": 1,
    "title": "My Startup Launch",
    "slug": "my-startup",
    "published": true,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-16T14:30:00Z",
    "url": "my-startup.waitly.co"
  },
  "metrics": {
    "signups": 892,
    "onboarding": 456,
    "views": 12847,
    "conversion": "6.9%"
  },
  "dailySignups": [
    {
      "date": "2024-01-16",
      "signups": 12
    }
  ],
  "signupSources": [
    { "source": "Direct", "count": 356 },
    { "source": "Social Media", "count": 267 },
    { "source": "Referrals", "count": 178 },
    { "source": "Search", "count": 89 }
  ],
  "recentSignups": [...],
  "recentOnboarding": [...]
}
```

## Authentication & Authorization

All user endpoints implement the following security measures:

1. **Authentication Check**: Verifies user is logged in
2. **Data Isolation**: Ensures users can only access their own data
3. **Page Ownership**: Verifies page belongs to the requesting user

```typescript
// Example authorization check
const { data: { user } } = await supabase.auth.getUser()
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

// Verify page ownership
const { data: page, error: pageError } = await supabase
  .from('pages')
  .select('id, config')
  .eq('id', pageId)
  .eq('user_id', user.id)
  .single()

if (pageError || !page) {
  return NextResponse.json({ error: 'Page not found or access denied' }, { status: 404 })
}
```

## Database Schema Integration

The user dashboard backend leverages the existing database schema:

### Pages Table
- `id` (bigint): Primary key
- `user_id` (uuid): Foreign key to users
- `title` (text): Page title
- `slug` (text): Page URL slug
- `config` (jsonb): Page configuration (stores email settings, API keys, templates, etc.)
- `html` (text): Generated HTML
- `published` (boolean): Publication status
- `created_at` (timestamptz): Creation date
- `updated_at` (timestamptz): Last update date

### Subscriptions Table
- `id` (bigint): Primary key
- `page_id` (bigint): Foreign key to pages
- `email` (text): Subscriber email
- `subscribed_at` (timestamptz): Subscription date

### Onboarding Responses Table
- `id` (bigint): Primary key
- `page_id` (bigint): Foreign key to pages
- `email` (text): Respondent email
- `questions` (jsonb): Onboarding questions
- `answers` (jsonb): User answers
- `completed_at` (timestamptz): Completion date

## Configuration Storage

User-specific settings are stored in the `config` JSONB field of the pages table:

```json
{
  "emailAutomation": {
    "welcomeEmail": {
      "enabled": true,
      "subject": "Welcome to our waitlist!",
      "body": "Thanks for joining...",
      "delay": 0
    }
  },
  "apiKeys": [
    {
      "id": "key_123",
      "name": "Production API Key",
      "key": "wly_1234567890abcdef",
      "created": "2024-01-15T10:30:00Z",
      "lastUsed": null,
      "permissions": ["read", "write"],
      "status": "active"
    }
  ],
  "webhookUrl": "https://api.example.com/webhooks",
  "webhookEvents": [
    { "name": "signup.created", "enabled": true }
  ],
  "template": "startup-launch",
  "theme": "modern",
  "colors": { "primary": "#6366f1", "secondary": "#8b5cf6" },
  "sections": ["hero", "features", "testimonials", "cta"],
  "industry": "startup"
}
```

## Frontend Integration

The user dashboard components have been updated to use real backend APIs:

### Email Automation Component
- Fetches real email settings from `/api/user/emails`
- Implements email configuration updates
- Provides test email functionality
- Shows loading states and error handling

### API Keys Component
- Displays actual API keys from `/api/user/api-keys`
- Enables API key creation, regeneration, and deletion
- Manages webhook configuration
- Implements key visibility toggling

### Analytics Component
- Real-time analytics from `/api/user/analytics`
- Dynamic charts based on actual data
- Page-specific analytics
- Performance metrics and trends

### Templates Component
- Available templates from `/api/user/templates`
- Template application functionality
- Saved template management

## Error Handling

All endpoints implement comprehensive error handling:

```typescript
try {
  // API logic
} catch (error) {
  console.error('API error:', error)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
```

Common error responses:
- `400`: Bad Request (missing required fields)
- `401`: Unauthorized (not logged in)
- `404`: Not Found (page not found or access denied)
- `500`: Internal Server Error

## Security Considerations

1. **Row Level Security (RLS)**: Database policies ensure data isolation
2. **User Authentication**: All endpoints require valid user session
3. **Page Ownership**: Users can only access their own pages
4. **Input Validation**: Request data is validated before processing
5. **API Key Security**: Secure generation and storage of API keys

## Performance Optimizations

1. **Efficient Queries**: Uses Supabase's built-in optimization
2. **Selective Data**: Only fetches required fields
3. **Caching Friendly**: Response format supports caching
4. **Batch Operations**: Efficient handling of multiple pages

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live analytics
2. **Advanced Filtering**: Date ranges, status filters, search
3. **Export Functionality**: CSV/JSON data export
4. **Email Templates**: Rich text editor for email customization
5. **Webhook Testing**: Test webhook delivery
6. **Analytics Export**: Detailed analytics reports
7. **Template Customization**: User-defined template modifications

## Testing

To test the user dashboard backend:

1. **Create Test User**: Register a new user account
2. **Create Test Pages**: Generate some waitlist pages
3. **Test Endpoints**: Use tools like Postman or curl
4. **Verify Data Isolation**: Test with multiple users
5. **Check Error Handling**: Test with invalid data

Example test:
```bash
# Get email settings (requires authentication)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/user/emails

# Create API key
curl -X POST -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"pageId":1,"name":"Test Key"}' \
     http://localhost:3000/api/user/api-keys

# Get analytics
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/user/analytics
```

## Deployment

The user dashboard backend is ready for production deployment:

1. **Environment Variables**: Ensure Supabase credentials are set
2. **Database Migration**: Run schema.sql if not already applied
3. **Authentication Setup**: Configure Supabase Auth
4. **Monitoring**: Set up error tracking and analytics
5. **Backup**: Configure database backups

The user dashboard backend provides a solid foundation for user management with comprehensive email automation, API key management, analytics, and template functionality while maintaining strict data isolation and security. 