import { getAboutPage } from '@/lib/api';
import type { AboutPageContent } from '@/lib/types';

export default async function AboutPage() {
  let page: AboutPageContent | null = null;
  
  try {
    const response = await getAboutPage();
    page = response.data ?? null;
  } catch (error) {
    console.error('Error fetching about page:', error);
  }

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">About Kungpao</h1>
        <p className="text-gray-600">Content not available yet. Please add content in Strapi admin.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      
      {page.aboutContent && (
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: page.aboutContent }}
        />
      )}

      {page.historyContent && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">{page.historyTitle}</h2>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.historyContent }}
          />
        </div>
      )}
    </div>
  );
}
