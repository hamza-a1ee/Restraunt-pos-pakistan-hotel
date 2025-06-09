/**
 * Capitalize the first letter of a string.
 *
 * @param str - The input string.
 *
 * @returns - The string with the first letter capitalized.
 *
 * @example capitalizeFirstLetter("hello") // Returns "Hello"
 *
 * @throws - If no string is provided.
 */
export const capitalizeFirstLetter = (str: string): string => {
      if (!str) throw new Error('No string provided');
    
      return str.charAt(0).toUpperCase() + str.slice(1);
    };