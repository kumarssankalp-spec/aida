import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role key for server-side operations (has full permissions)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Insert into lead_data using service role (bypasses RLS)
    const { data: result, error } = await supabaseAdmin
      .from('lead_data')
      .insert([{
        session_id: data.sessionId,
        user_id: data.userId || null,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        services: Array.isArray(data.services) ? data.services.join(', ') : data.services,
        message: data.message || null,
        source_page: data.sourcePage || null,
        source_url: data.sourceUrl || null,
        referrer_url: data.referrerUrl || null,
        country: data.country || null,
        city: data.city || null,
        region: data.region || null,
        postal_code: data.postalCode || null,
        timezone: data.timezone || null,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        ip_address: data.ipAddress || null,
        device_type: data.deviceType || null,
        browser: data.browser || null,
        browser_version: data.browserVersion || null,
        os: data.os || null,
        os_version: data.osVersion || null,
        screen_resolution: data.screenResolution || null,
        is_mobile: data.isMobile || false,
        is_tablet: data.isTablet || false,
        language: data.language || null,
        locale: data.locale || null,
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
        utm_term: data.utmTerm || null,
        utm_content: data.utmContent || null,
        email_sent: data.emailSent || false,
        contacted: false,
        submitted_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.error('Failed to save lead:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
