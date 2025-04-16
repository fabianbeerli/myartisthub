/**
 * Generates an album cover image using DALL-E based on the prompt
 * @param prompt The text description of the desired album cover
 * @returns URL of the generated image
 */
export async function generateAlbumCover(prompt: string): Promise<string> {
    try {
      // Call our API endpoint to handle the DALL-E request
      const response = await fetch('/api/generate-cover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error:', response.status, errorData);
        throw new Error(errorData.error || `API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.url) {
        throw new Error('No image URL returned from the API');
      }
      
      return data.url;
    } catch (error) {
      console.error('Error generating album cover:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Failed to generate album cover');
    }
  }