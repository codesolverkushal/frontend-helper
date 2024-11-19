import { Link, useParams } from "react-router-dom"
import Filter from "./FilterPage";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { Restaurant, useRestaurantStore } from "@/store/useRestaurantStore";
const SearchPage = () => {
    const params = useParams();

    const {searchRestaurant,searchedRestaurant,appliedFilter,setAppliedFilter} = useRestaurantStore();
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        searchRestaurant(params.text!, searchQuery, appliedFilter);
      }, [params.text!, appliedFilter]);
    
    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <Filter />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={searchQuery}
                            placeholder="Restaurant and Cuisines"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button onClick={()=> searchRestaurant(params.text!,searchQuery,appliedFilter)} className="bg-amber-500 hover:bg-amber-600">Search</Button>
                    </div>
                    <div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
                            <h1>({searchedRestaurant?.data.length}) Search Result Found!</h1>
                            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                {
                                   appliedFilter.map((selectedFilter: string, idx: number) => (
                                        <div key={idx} className="relative inline-flex items-center max-w-full">
                                            <Badge className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap" variant="outline">{selectedFilter}</Badge>
                                            <X onClick={()=> setAppliedFilter(selectedFilter)} size={15} className="absolute text-[#D19254] right-1 hover:cursor-pointer " />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {/* Restaurant Card */}

                        <div className="grid md:grid-cols-3 gap-4">
                            {
                                searchedRestaurant?.data.map((restaurant: Restaurant) => (
                                    <Card
                                      key={restaurant._id}
                                      className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                                    >
                                      <div className="relative">
                                        <AspectRatio ratio={16 / 6}>
                                          <img
                                            src={restaurant.imageUrl}
                                            alt=""
                                            className="w-full h-full object-cover"
                                          />
                                        </AspectRatio>
                                        <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Featured
                                          </span>
                                        </div>
                                      </div>
                                      <CardContent className="p-4">
                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                          {restaurant.restaurantName}
                                        </h1>
                                        <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                                          <MapPin size={16} />
                                          <p className="text-sm">
                                            City:{" "}
                                            <span className="font-medium">{restaurant.city}</span>
                                          </p>
                                        </div>
                                        <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                                          <Globe size={16} />
                                          <p className="text-sm">
                                            Country:{" "}
                                            <span className="font-medium">
                                              {restaurant.country}
                                            </span>
                                          </p>
                                        </div>
                                        <div className="flex gap-2 mt-4 flex-wrap">
                                          {restaurant.cuisines.map(
                                            (cuisine: string, idx: number) => (
                                              <Badge
                                                key={idx}
                                                className="font-medium px-2 py-1 rounded-full shadow-sm"
                                              >
                                                {cuisine}
                                              </Badge>
                                            )
                                          )}

                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                                        <Link to={`/restaurant/${restaurant._id}`}>
                                            <Button className="bg-amber-500 hover:bg-amber-600 font-semibold px-4 rounded-lg transition-colors duration-200">View Menu</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;