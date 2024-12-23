import { supabase } from '@/integrations/supabase/client';

export interface GenerateImageParams {
  prompt: string;
  width?: number;
  height?: number;
}

export const generateImage = async (params: GenerateImageParams) => {
  console.log('Calling generate-image function with params:', params);
  
  try {
    const { data, error } = await supabase.functions.invoke('generate-image', {
      body: params
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to generate image: ${error.message}`);
    }

    if (!data) {
      console.error('No data received from function');
      throw new Error('No response data received');
    }

    console.log('Function response:', data);

    if (!data.url) {
      console.error('Invalid response structure:', data);
      throw new Error('No image URL in response');
    }

    return data;
  } catch (error) {
    console.error('Generation error:', error);
    // Re-throw the error to be handled by the component
    throw error;
  }
};