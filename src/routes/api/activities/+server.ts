import { json } from '@sveltejs/kit';

export async function GET() {
  const res = await fetch('https://kalender.lokalstyre.no/api/configuration');
  if (!res.ok) {
    return json({ error: 'Failed to fetch from remote API' }, { status: 500 });
  }

  const data = await res.json();

  // Extract, sort, and limit to 10 upcoming events
  const events = (data.promotedEvents ?? [])
    .filter(ev => new Date(ev.eventTime) > new Date())
    .sort((a, b) => new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime())
    .slice(0, 4);

  return json(events);
}
