import {
  ICusine,
  ICusineCategory,
} from "@/shared/interface/user/cusines.interface";

export const NEW_ID = "new_id";

/**
 * An array of cuisine category objects used to classify Pakistani dishes.
 * Each category has a unique string `id` and a `name`.
 */
export const cuisinesCategories: ICusineCategory[] = [
  { id: "cat-1", name: "Rice Dishes" },
  { id: "cat-2", name: "Vegetarian Dishes" },
  { id: "cat-3", name: "Gravy Dishes" },
  { id: "cat-4", name: "BBQ & Meaty" },
  { id: "cat-5", name: "Desserts" },
  { id: "cat-6", name: "Snacks & Sides" },
];

/**
 * An array of Pakistani cuisine dishes.
 * Each dish has a unique string `id`, a `name`, a `price`, and a `categoryId` referencing a category.
 */
export const pakistaniCuisines: ICusine[] = [
  { id: "dish-1", name: "Biryani", price: 450, categoryId: "cat-1" },
  { id: "dish-2", name: "Nihari", price: 500, categoryId: "cat-3" },
  { id: "dish-3", name: "Haleem", price: 400, categoryId: "cat-3" },
  { id: "dish-4", name: "Karahi", price: 700, categoryId: "cat-2" },
  { id: "dish-5", name: "Paya", price: 480, categoryId: "cat-3" },
  { id: "dish-6", name: "Chapli Kebab", price: 350, categoryId: "cat-4" },
  { id: "dish-7", name: "Sajji", price: 800, categoryId: "cat-4" },
  { id: "dish-8", name: "Aloo Keema", price: 300, categoryId: "cat-2" },
  { id: "dish-9", name: "Chicken Korma", price: 550, categoryId: "cat-3" },
  { id: "dish-10", name: "Sindhi Biryani", price: 470, categoryId: "cat-1" },
  { id: "dish-11", name: "Beef Biryani", price: 460, categoryId: "cat-1" },
  { id: "dish-12", name: "Chicken Tikka", price: 420, categoryId: "cat-4" },
  { id: "dish-13", name: "Seekh Kabab", price: 360, categoryId: "cat-4" },
  { id: "dish-14", name: "Mutton Korma", price: 600, categoryId: "cat-3" },
  { id: "dish-15", name: "Daal Chawal", price: 250, categoryId: "cat-2" },
  { id: "dish-16", name: "Bhuna Gosht", price: 550, categoryId: "cat-3" },
  { id: "dish-17", name: "Gola Kabab", price: 370, categoryId: "cat-4" },
  { id: "dish-18", name: "Tandoori Roti", price: 20, categoryId: "cat-2" },
  { id: "dish-19", name: "Roghani Naan", price: 30, categoryId: "cat-2" },
  { id: "dish-20", name: "Malai Boti", price: 480, categoryId: "cat-4" },
  { id: "dish-21", name: "Shami Kabab", price: 300, categoryId: "cat-4" },
  { id: "dish-22", name: "Anda Curry", price: 280, categoryId: "cat-2" },
  { id: "dish-23", name: "Kadhi Pakora", price: 260, categoryId: "cat-2" },
  { id: "dish-24", name: "Baingan Bharta", price: 240, categoryId: "cat-2" },
  { id: "dish-25", name: "Chana Masala", price: 230, categoryId: "cat-2" },
  { id: "dish-26", name: "Palak Gosht", price: 500, categoryId: "cat-3" },
  { id: "dish-27", name: "Tikka Boti", price: 470, categoryId: "cat-4" },
  { id: "dish-28", name: "Mutton Karahi", price: 750, categoryId: "cat-3" },
  { id: "dish-29", name: "Chicken Handi", price: 680, categoryId: "cat-3" },
  { id: "dish-30", name: "Lahori Chargha", price: 900, categoryId: "cat-4" },
  { id: "dish-31", name: "Tandoori Chicken", price: 650, categoryId: "cat-4" },
  { id: "dish-32", name: "Fish Curry", price: 600, categoryId: "cat-3" },
  { id: "dish-33", name: "Dal Makhani", price: 280, categoryId: "cat-2" },
  { id: "dish-34", name: "Chicken Shashlik", price: 520, categoryId: "cat-4" },
  { id: "dish-35", name: "Vegetable Pulao", price: 270, categoryId: "cat-2" },
  { id: "dish-36", name: "Murgh Cholay", price: 390, categoryId: "cat-3" },
  { id: "dish-37", name: "Gajar Ka Halwa", price: 180, categoryId: "cat-5" },
  { id: "dish-38", name: "Zarda", price: 200, categoryId: "cat-5" },
  { id: "dish-39", name: "Kheer", price: 190, categoryId: "cat-5" },
  { id: "dish-40", name: "Ras Malai", price: 220, categoryId: "cat-5" },
  { id: "dish-41", name: "Samosa", price: 60, categoryId: "cat-6" },
  { id: "dish-42", name: "Pakora", price: 70, categoryId: "cat-6" },
  { id: "dish-43", name: "Dahi Bhalla", price: 90, categoryId: "cat-6" },
  { id: "dish-44", name: "Fruit Chaat", price: 100, categoryId: "cat-6" },
  { id: "dish-45", name: "Chicken Roll", price: 120, categoryId: "cat-6" },
  { id: "dish-46", name: "Spring Roll", price: 130, categoryId: "cat-6" },
  { id: "dish-47", name: "French Fries", price: 150, categoryId: "cat-6" },
  { id: "dish-48", name: "Chutney", price: 30, categoryId: "cat-6" },
  { id: "dish-49", name: "Raita", price: 20, categoryId: "cat-6" },
  { id: "dish-50", name: "Green Salad", price: 50, categoryId: "cat-6" },
];
