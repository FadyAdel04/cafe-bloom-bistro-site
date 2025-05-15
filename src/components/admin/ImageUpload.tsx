
import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

const ImageUpload = ({ value, onChange, className = '' }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploading(true);
    setError(null);
    
    try {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم الملف كبير جدًا. الحد الأقصى هو 5 ميجابايت');
        setUploading(false);
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('يجب أن يكون الملف صورة');
        setUploading(false);
        return;
      }
      
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `food-images/${fileName}`;
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('food-images')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data } = supabase.storage
        .from('food-images')
        .getPublicUrl(filePath);
        
      // Set the image URL
      onChange(data.publicUrl);
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message || 'حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploading(false);
    }
  };
  
  const handleRemove = () => {
    onChange('');
  };
  
  return (
    <div className={`border-2 border-dashed rounded-md p-4 text-center ${className}`}>
      {value ? (
        <div className="relative">
          <img 
            src={value} 
            alt="Uploaded" 
            className="max-h-48 mx-auto object-contain rounded-md" 
          />
          <button 
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="py-4">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">اضغط أو اسحب لرفع صورة</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF حتى 5MB</p>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
      
      <div className="mt-4">
        <label className="cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleUpload}
            disabled={uploading}
          />
          <div className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm ${uploading ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>جاري الرفع...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                <span>{value ? 'تغيير الصورة' : 'رفع صورة'}</span>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
