import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMemory, useUploadImage } from '@/hooks/queries/useMemories';
import { CreateMemoryInput } from '@/schemas/memory.schema';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { RichTextEditor } from '@/components/common/RichTextEditor/RichTextEditor';
// import { toast } from 'react-hot-toast'; // Removed unused import

export const MemoryCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateMemory();
  const uploadMutation = useUploadImage();

  const [formData, setFormData] = useState<CreateMemoryInput>({
    title: '',
    content: '',
    date: new Date().toISOString(),
    visibility: 'public',
    tags: [],
    images: [],
  });

  const handleImageUpload = async (file: File): Promise<string> => {
    const response = await uploadMutation.mutateAsync(file);
    return response.data?.url || '';
  };

  const handleSubmit = async () => {
    try {
      await createMutation.mutateAsync(formData);
      navigate('/timeline');
    } catch (error) {
      // Error handled by React Query
    }
  };

  return (
    <div className="memory-create-page">
      <Input
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <RichTextEditor
        value={formData.content}
        onChange={(content) => setFormData({ ...formData, content })}
        onImageUpload={handleImageUpload}
      />

      <Button
        onClick={handleSubmit}
        isLoading={createMutation.isPending}
      >
        Create Memory
      </Button>
    </div>
  );
};