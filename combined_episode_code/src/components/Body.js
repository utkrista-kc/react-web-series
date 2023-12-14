import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  // Local state variable - super powerful variable
  const arr = useState(resList); // default value passed
  const [listofRestaurants, setListOfRestaurants] = arr;

  let listofRestaurantsJS = [
    {
      data: {
        id: "73011",
        name: "KFC",
        cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
        cuisines: ["American", "Snacks", "Biryani"],
        costForTwo: 30000,
        deliveryTime: 31,
        avgRating: "3.5",
      },
    },
    {
      data: {
        id: "73012",
        name: "KFC",
        cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
        cuisines: ["American", "Snacks", "Biryani"],
        costForTwo: 40000,
        deliveryTime: 36,
        avgRating: "4.5",
      },
    },
  ];
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listofRestaurants.filter(
              (res) => res.data.avgRating > 4
            );

            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listofRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
