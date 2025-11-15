import { getGalleryItems } from '@/lib/api';

export default async function GalleryPage() {
  const response = await getGalleryItems();
  const items = response.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-600">No gallery items available yet. Add items in Strapi admin.</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item: any) => (
            <div key={item.id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
