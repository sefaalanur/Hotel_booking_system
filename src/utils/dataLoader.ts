export const loadJsonFile = async <T>(filePath: string): Promise<T> => {
    try {
      const response = await fetch(filePath);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${filePath}, status: ${response.status}`);
      }
  
      return await response.json() as T;
    } catch (error) {
      console.error(`Error loading file ${filePath}:`, error);
      throw error;
    }
  };