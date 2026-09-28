"use client";

export default function CloudinaryPDFViewer({ publicId} : {publicId :string} ) {
  
  return (
   <div>
      <iframe
        src={`https://res.cloudinary.com/hcn0f9nu/image/upload/v1786660548/${publicId}.pdf`}
        width="100%"
        height="800"
        title="Brand guidelines PDF preview"
      />
    </div>
  );
}