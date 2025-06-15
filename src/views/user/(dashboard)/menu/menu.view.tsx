"use client";
import PrimaryButton from "@/components/button/primary-button.component";
import { BadgePlus } from "lucide-react";
import CategoryTable from "./category-table";
import { useEffect, useState } from "react";
import DishTable from "./dish-table";
import AddCategoryDialog from "./dialogs/add-category.dialog";
import AddDishDialog from "./dialogs/add-dish.dialog";
import { NEW_ID } from "@/constants";

export default function MenuView() {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [dishesLimit, setDishesLimit] = useState<number>(10);
  const [dishesPage, setDishesPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDish, setSelectedDish] = useState<string>("");

  console.log({ selectedDish });
  console.log({ selectedCategory });

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    setDishesPage(1);
  }, [dishesLimit]);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Categories</h1>
        <PrimaryButton
          onClick={() => setSelectedCategory(NEW_ID)}
          className="w-max"
          type="button"
        >
          <BadgePlus /> Add Category
        </PrimaryButton>
      </div>
      <CategoryTable
        limit={limit}
        page={page}
        setLimit={setLimit}
        setPage={setPage}
        onDetails={(id: string) => setSelectedCategory(id)}
        categories={{
          categories: [{ id: "1", name: "Roti", totalDishes: 12 }],
          meta: {
            page: 1,
            limit: 1,
            total: 1,
            totalPages: 1,
          },
        }}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Dishes</h1>
        <PrimaryButton
          onClick={() => setSelectedDish(NEW_ID)}
          className="w-max"
          type="button"
        >
          <BadgePlus /> Add Dish
        </PrimaryButton>
      </div>{" "}
      <DishTable
        limit={dishesLimit}
        setLimit={setDishesLimit}
        page={dishesPage}
        setPage={setDishesPage}
        onDetails={(id: string) => setSelectedDish(id)}
        dishes={{
          dishes: [{ categoryId: "1", id: "1", name: "Biryani", price: 300 }],
          meta: {
            page: 1,
            limit: 1,
            total: 1,
            totalPages: 1,
          },
        }}
      />
      <AddDishDialog
        open={!!selectedDish}
        onOpenChange={() => setSelectedDish("")}
      />
      <AddCategoryDialog
        open={!!selectedCategory}
        onOpenChange={() => setSelectedCategory("")}
      />
    </div>
  );
}
