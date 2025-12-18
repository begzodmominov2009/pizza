import axios from "axios";
import React, { useEffect, useState } from "react";


const CategoryPage = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                let res = await axios.get("https://693d1ae6f55f1be79301e90f.mockapi.io/categories")
                setCategory(res.data)

            } catch (err) {
                console.log(err);

            }
        }
        fetchCategory()
    }, [])

    return (
        <div className="px-2">
            <div className="grid grid-cols-4 gap-4">
                {category.map((item) => (
                    <a href={`all/${item.id}`}
                        key={item.id}
                        className="flex flex-col gap-[2px] items-center justify-center
                       bg-white rounded-[16px] p-4
                       shadow-sm cursor-pointer
                       hover:shadow-md transition"
                    >
                       <div>
                        <img className="h-7" src={item.icon} alt={item.title} />
                       </div>
                        <p className="text-[14px] text-center font-medium">
                            {item.title}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
