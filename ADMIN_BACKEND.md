# Admin Backend Implementation

This document outlines the complete backend implementation for the admin functionality in the Waitly platform.

## Overview

The admin backend provides comprehensive platform management capabilities including user management, page oversight, analytics, and platform settings. All endpoints require admin authentication and authorization.

## API Endpoints

### 1. User Management (`/api/admin/users`)

#### GET `/api/admin/users`
Retrieves all users with their statistics and page information.

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "user|admin",
      "signupDate": "2024-01-15T10:30:00Z",
      "pagesCount": 3,
      "publishedPagesCount": 2,
      "signupsCollected": 1247,
      "status": "active",
      "lastLogin": "2024-01-15T10:30:00Z"
    }
  ],
  "stats": {
    "total": 50,
    "active": 45,
    "admins": 3,
    "totalPages": 150
  }
}
```

#### PUT `/api/admin/users`
Updates user role (promote to admin).

**Request Body:**
```json
{
  "userId": "uuid",
  "role": "admin"
}
```

#### DELETE `/api/admin/users?id={userId}`
Deletes a user and all associated data (cascade delete).

### 2. Page Management (`/api/admin/pages`)

#### GET `/api/admin/pages`
Retrieves all waitlist pages with user and signup statistics.

**Response:**
```json
{
  "success": true,
  "pages": [
    {
      "id": 1,
      "title": "SaaS Product Launch",
      "user": "User Name",
      "userEmail": "user@example.com",
      "url": "saas-launch.waitly.co",
      "signups": 1247,
      "status": "active|inactive",
      "createdDate": "2024-01-15T10:30:00Z",
      "lastActivity": "2024-01-15T10:30:00Z",
      "views": 12847,
      "conversion": 9.7,
      "onboardingCount": 234
    }
  ],
  "stats": {
    "total": 150,
    "active": 120,
    "totalSignups": 28473,
    "totalViews": 1284700
  }
}
```

#### PUT `/api/admin/pages`
Updates page published status.

**Request Body:**
```json
{
  "pageId": 1,
  "published": false
}
```

#### DELETE `/api/admin/pages?id={pageId}`
Deletes a page and all associated data (cascade delete).

### 3. Analytics (`/api/admin/analytics`)

#### GET `/api/admin/analytics`
Retrieves comprehensive platform analytics and metrics.

**Response:**
```json
{
  "success": true,
  "metrics": {
    "totalUsers": 1247,
    "totalPages": 342,
    "publishedPages": 289,
    "totalSignups": 28473,
    "totalOnboarding": 15678,
    "recentUsers": 45,
    "recentPages": 12,
    "recentSignups": 892
  },
  "usageData": [
    {
      "day": "Mon",
      "signups": 245,
      "users": 12
    }
  ],
  "performance": {
    "avgSignupsPerPage": "83.2",
    "avgOnboardingPerPage": "45.8",
    "signupToOnboardingRate": "55.1%",
    "emailDeliveryRate": "99.2%",
    "avgPageLoadTime": "1.2s",
    "activeApiIntegrations": 156
  },
  "trends": {
    "userGrowth": "+12%",
    "pageGrowth": "+8%",
    "signupGrowth": "+15%"
  }
}
```

### 4. Platform Settings (`/api/admin/settings`)

#### GET `/api/admin/settings`
Retrieves current platform settings and configuration.

**Response:**
```json
{
  "success": true,
  "settings": {
    "enableReferrals": true,
    "enableEmailAutomation": true,
    "enableApiAccess": true,
    "enableAnalytics": true,
    "maxPagesPerUser": 10,
    "maxSignupsPerPage": 10000,
    "defaultEmailTemplate": "Welcome to our waitlist!",
    "supportEmail": "support@waitly.co",
    "platformName": "Waitly",
    "pricingTiers": [
      {
        "name": "Free",
        "price": 0,
        "features": ["1 waitlist page", "Up to 100 signups"],
        "maxPages": 1,
        "maxSignups": 100
      }
    ]
  }
}
```

#### PUT `/api/admin/settings`
Updates platform settings.

**Request Body:**
```json
{
  "platformName": "Waitly",
  "supportEmail": "support@waitly.co",
  "enableReferrals": true,
  "maxPagesPerUser": 10
}
```

## Authentication & Authorization

All admin endpoints implement the following security measures:

1. **Authentication Check**: Verifies user is logged in
2. **Admin Role Check**: Ensures user has `admin` role in the database
3. **Error Handling**: Returns appropriate HTTP status codes

```typescript
// Example authorization check
const { data: { user } } = await supabase.auth.getUser()
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

const { data: userData } = await supabase
  .from('users')
  .select('role')
  .eq('id', user.id)
  .single()

if (!userData || userData.role !== 'admin') {
  return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
}
```

## Database Schema

The admin backend leverages the existing database schema:

### Users Table
- `id` (uuid): Primary key
- `email` (text): User email
- `name` (text): User name
- `role` (text): User role ('user' or 'admin')
- `created_at` (timestamptz): Account creation date

### Pages Table
- `id` (bigint): Primary key
- `user_id` (uuid): Foreign key to users
- `title` (text): Page title
- `slug` (text): Page URL slug
- `config` (jsonb): Page configuration
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

## Frontend Integration

The admin components have been updated to use real backend APIs:

### User Management Component
- Fetches real user data from `/api/admin/users`
- Implements user promotion and deletion
- Shows loading states and error handling
- Real-time statistics updates

### Waitlist Pages Manager
- Displays actual page data with signup statistics
- Enables page status management (enable/disable)
- Provides page deletion functionality
- Shows conversion rates and performance metrics

### Admin Dashboard Home
- Real-time analytics from `/api/admin/analytics`
- Dynamic usage charts based on actual data
- Performance metrics and trends
- Loading states and error handling

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
- `403`: Forbidden (not admin)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

## Security Considerations

1. **Row Level Security (RLS)**: Database policies ensure data isolation
2. **Admin Role Verification**: All endpoints check for admin privileges
3. **Input Validation**: Request data is validated before processing
4. **Cascade Deletes**: Proper cleanup of related data
5. **Error Logging**: Comprehensive error tracking

## Performance Optimizations

1. **Efficient Queries**: Uses Supabase's built-in optimization
2. **Selective Data**: Only fetches required fields
3. **Pagination Ready**: Structure supports future pagination
4. **Caching Friendly**: Response format supports caching

## Future Enhancements

1. **Real-time Analytics**: WebSocket integration for live updates
2. **Advanced Filtering**: Date ranges, status filters, search
3. **Bulk Operations**: Mass user/page management
4. **Audit Logging**: Track admin actions
5. **Export Functionality**: CSV/JSON data export
6. **Notification System**: Admin alerts for important events

## Testing

To test the admin backend:

1. **Create Admin User**: Update a user's role to 'admin' in the database
2. **Test Endpoints**: Use tools like Postman or curl
3. **Verify Authorization**: Test with non-admin users
4. **Check Error Handling**: Test with invalid data

Example test:
```bash
# Get users (requires admin authentication)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/admin/users

# Promote user to admin
curl -X PUT -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"userId":"uuid","role":"admin"}' \
     http://localhost:3000/api/admin/users
```

## Deployment

The admin backend is ready for production deployment:

1. **Environment Variables**: Ensure Supabase credentials are set
2. **Database Migration**: Run schema.sql if not already applied
3. **Admin User Setup**: Create initial admin user
4. **Monitoring**: Set up error tracking and analytics
5. **Backup**: Configure database backups

The admin backend provides a solid foundation for platform management with comprehensive user and page oversight, real-time analytics, and secure administrative controls. 