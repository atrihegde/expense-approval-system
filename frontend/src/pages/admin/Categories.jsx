import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loader from "../../components/common/Loader";
import CategoryTable from "../../components/common/CategoryTable";
import CategoryModal from "../../components/common/CategoryModal";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../services/categoryService";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const loadCategories = async () => {
        try {
            const data = await getCategories(search);
            setCategories(data.results ?? data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSave = async (categoryData) => {
        try {
            if (selectedCategory) {
                const updateData = {
                    name: categoryData.name,
                    max_amount: categoryData.max_amount,
                    description: categoryData.description,
                    status: selectedCategory.status,
                };
                await updateCategory(
                    selectedCategory.id,
                    updateData
                );
                toast.success("Category updated successfully!");
            }
            else {
                await createCategory(categoryData);
                toast.success("Category created successfully!");
            }
            setShowModal(false);
            setSelectedCategory(null);
            await loadCategories();
        } 
        catch (error) {
            console.error(error.response?.data);
            const errors = error.response?.data;
            if (errors) {
                Object.entries(errors).forEach(([field, value]) => {
                    const message = Array.isArray(value)
                        ? value.join(", ")
                        : value;
                    toast.error(`${field}: ${message}`);
                });
            }
        }
    };


    const handleDelete = async (category) => {
        const confirmed = window.confirm(
            `Delete category "${category.name}"?`
        );
        if (!confirmed) return;
        try {
            await deleteCategory(category.id);
            toast.success("Category deleted successfully!");
            await loadCategories();
        } catch (error) {
            console.error(error.response?.data);
            toast.error("Unable to delete category.");
        }
    };


    useEffect(() => {
        loadCategories();
    }, [search]);

    if (!categories) {
        return <Loader />;
    }

    return (
        <div>

            <h2 className="mb-4">
                Category Management
            </h2>


            <div className="row mb-4">

                <div className="col-md-6">

                    <input
                        className="form-control"
                        placeholder="Search category..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="col-md-6 text-end">

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setSelectedCategory(null);
                            setShowModal(true);
                        }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>

                        Add Category

                    </button>

                </div>

            </div>

            <CategoryTable
                categories={categories}
                onEdit={(category) => {
                    setSelectedCategory(category);
                    setShowModal(true);
                }}
                onDelete={handleDelete}
            />

            <CategoryModal
                show={showModal}
                category={selectedCategory}
                onClose={() => {
                    setShowModal(false);
                    setSelectedCategory(null);
                }}
                onSave={handleSave}
            />

        </div>
    );
}

export default Categories;