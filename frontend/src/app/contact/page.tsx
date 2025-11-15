import { getContactPage } from '@/lib/api';

export default async function ContactPage() {
  let page = null;
  
  try {
    const response = await getContactPage();
    page = response.data;
  } catch (error) {
    console.error('Error fetching contact page:', error);
  }

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <p className="text-gray-600">Content not available yet. Please add content in Strapi admin.</p>
      </div>
    );
  }

  const socialLinks = page.socialLinks || {};

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      
      {page.introText && (
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: page.introText }}
        />
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Booking</h2>
          {page.bookingEmail && (
            <p className="mb-2">
              <strong>Email:</strong>{' '}
              <a href={`mailto:${page.bookingEmail}`} className="text-red-600 hover:underline">
                {page.bookingEmail}
              </a>
            </p>
          )}
          {page.bookingPhone && (
            <p>
              <strong>Phone:</strong> {page.bookingPhone}
            </p>
          )}
        </div>

        {Object.keys(socialLinks).length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Social Media</h2>
            <div className="space-y-2">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="block text-red-600 hover:underline">
                  Facebook
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="block text-red-600 hover:underline">
                  Instagram
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="block text-red-600 hover:underline">
                  YouTube
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {page.managementContact && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Management</h2>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.managementContact }}
          />
        </div>
      )}
    </div>
  );
}
