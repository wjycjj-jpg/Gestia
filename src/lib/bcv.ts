import { supabase } from './supabase';

export async function fetchBCVRate(): Promise<number | null> {
  try {
    const response = await fetch('https://www.bcv.org.ve/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GestiaBot/1.0)' },
    });
    const html = await response.text();

    const rateMatch = html.match(/<div[^>]*id="dolar"[^>]*>[\s\S]*?<strong[^>]*>([\d.,]+)<\/strong>/i);
    if (rateMatch) {
      const rate = parseFloat(rateMatch[1].replace(/\./g, '').replace(',', '.'));
      if (!isNaN(rate)) {
        await supabase.from('exchange_rates').upsert(
          { source: 'BCV', rate, updated_at: new Date().toISOString() },
          { onConflict: 'source' }
        );
        return rate;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function getLatestBCVRate(): Promise<number> {
  const { data } = await supabase
    .from('exchange_rates')
    .select('rate')
    .eq('source', 'BCV')
    .single();
  return data?.rate || 360;
}
