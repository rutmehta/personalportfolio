import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rutmehta.com';

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/journey`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog/testing-jev`, lastModified: new Date('2026-09-25'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog/jev-browser-agent`, lastModified: new Date('2026-09-25'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];
}
