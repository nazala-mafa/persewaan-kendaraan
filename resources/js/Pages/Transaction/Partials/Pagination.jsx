import React from "react";

function Pagination({ currentPage, dataLength, itemsPerPage, setCurrentPage }) {
    const totalPages = Math.ceil(dataLength / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    return (
        <div className="pagination flex gap-2">
            <button className="border-2 p-1 px-4" onClick={prevPage}>
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`${
                        currentPage === index + 1 ? "bg-green-300" : ""
                    } border-2 p-1 px-4`}
                >
                    {index + 1}
                </button>
            ))}
            <button className="border-2 p-1 px-4" onClick={nextPage}>
                Next
            </button>
        </div>
    );
}

export default Pagination;
