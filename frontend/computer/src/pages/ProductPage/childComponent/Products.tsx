/* import React, { useEffect, useState } from "react";
import ProductItems from "./ProductItems";
import styles from "../product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest } from "../../../sliceReducers/getComputerDataSlice";
import { CiSearch } from "react-icons/ci";
import DropDownSection from "./DropDownSection";
import { RootState } from "../../../store/store";

export interface productsType {
  id: number;
  url: string;
  name: string;
  description: string;
  price: number;
  imgs?: string[];
  discount: number;
  finalPrice: number;
}
export interface filterArrType {
  label: string;
  value: string;
}
export default function Products() {
  const [products, setProducts] = useState<productsType[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [dropDownVal, setDropDownVal] = useState<string>("Choose price");
  const priceFilterArr: filterArrType[] = [
    { label: "Cheaper", value: "Cheaper" },
    { label: "Expensive", value: "Expensive" }
  ];
  const dispatch = useDispatch();

  const productsData = useSelector(
    (state: RootState) => state.computerData.computerData || []
  );
  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////7
  //  filter section 
  const handleValue = (val: string) => {
    setDropDownVal(val);
    filterSection(searchVal, val);
  };

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = e.target.value;
    setSearchVal(newVal);
    filterSection(newVal, dropDownVal);
  }

  function filterSection(searchVal: string, dropVal: string) {
    let filteredProduct = [...productsData];

    if (searchVal) {
      filteredProduct = filteredProduct.filter((item) =>
        item.name.toLowerCase().includes(searchVal.toLowerCase())
      );
    }
    if (dropVal === "Expensive") {
      filteredProduct = [...filteredProduct].sort(
        (a, b) => (b.finalPrice ?? 0) - (a.finalPrice ?? 0)
      );
    } else if (dropVal === "Cheaper") {
      filteredProduct = [...filteredProduct].sort(
        (a, b) => (a.finalPrice ?? 0) - (b.finalPrice ?? 0)
      );
    }

    setProducts(filteredProduct);
  }

  return (
    <div className={styles.productMainContainer}>
      <div className={styles.filterSection}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="search"
            value={searchVal}
            onChange={(e) => handleSearch(e)}
          />
          <CiSearch />
        </div>
        <div>
          <DropDownSection
            priceFilterArr={priceFilterArr}
            dropDownVal={dropDownVal}
            handleValue={handleValue}
          />
        </div>
      </div>
      <div className={styles.ProductContainer}>
        {products &&
          products.map((item, index) => {
            return <ProductItems item={item} index={index} key={index} />;
          })}
      </div>
    </div>
  );
}
 */
/* import React, { useEffect, useState } from "react";
import ProductItems from "./ProductItems";
import styles from "../product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest } from "../../../sliceReducers/getComputerDataSlice";
import { CiSearch } from "react-icons/ci";
import DropDownSection from "./DropDownSection";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import type { RootState } from "../../../store/store";

export interface productsType {
  id: number;
  url: string;
  name: string;
  description: string;
  price: number;
  imgs?: string[];
  discount: number;
  finalPrice: number;
}
export interface filterArrType {
  label: string;
  value: string;
}
export default function Products() {
  const [products, setProducts] = useState<productsType[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");

  const [dropDownVal, setDropDownVal] = useState<string>("Choose price");
  const priceFilterArr: filterArrType[] = [
    { label: "Cheaper", value: "Cheaper" },
    { label: "Expensive", value: "Expensive" },
  ];
  const dispatch = useDispatch();

  const productsData = useSelector((state: RootState) =>
    Array.isArray(state.computerData.computerData)
      ? state.computerData.computerData
      : []
  );

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(productsData)) {
      // Map productsData to ensure all fields match local productsType
      const mappedProducts = productsData.map((item) => ({
        ...item,
        price:
          typeof item.price === "number" ? item.price : Number(item.price) || 0,
        discount:
          typeof item.discount === "number"
            ? item.discount
            : Number(item.discount) || 0,
        finalPrice:
          typeof item.finalPrice === "number"
            ? item.finalPrice
            : Number(item.finalPrice) || 0,
      }));
      setProducts((prev) => {
        const isSame =
          prev.length === mappedProducts.length &&
          prev.every((item, index) => item.id === mappedProducts[index].id);
        return isSame ? prev : mappedProducts;
      });
    }
  }, [productsData]);

  // create slice page

  // **Pagination State**
  const [currentPage, setCurrentPage] = useState<number>(1);
  const visibleCard: number = 6;
  const showPagesNumber = 3;
  const [startPage, setStartPage] = useState(1);

  // **Apply filtering first, then slice**
  const filteredProducts = products;
  const totalPages = Math.ceil(filteredProducts.length / visibleCard);
  const startIndex = (currentPage - 1) * visibleCard;
  const endIndex = startIndex + visibleCard;
  const SlicedProductArr = filteredProducts.slice(startIndex, endIndex);

  const getVisiblePages = () => {
    const endPage = Math.min(totalPages, startPage + showPagesNumber - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const visiblePages = getVisiblePages();

  const changePage = (page: number) => {
    setCurrentPage(page);

    if (page === visiblePages[visiblePages.length - 1] && page < totalPages) {
      setStartPage((prev) =>
        Math.min(prev + 1, totalPages - showPagesNumber + 1)
      );
    }

    if (page === visiblePages[0] && page > 1) {
      setStartPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  // **Filtering function**
  function filterSection(searchVal: string, dropVal: string) {
    let filteredProduct = [...productsData];

    if (searchVal) {
      filteredProduct = filteredProduct.filter((item) =>
        item.name.toLowerCase().includes(searchVal.toLowerCase())
      );
    }
    if (dropVal === "Expensive") {
      filteredProduct.sort((a, b) => (b.finalPrice ?? 0) - (a.finalPrice ?? 0));
    } else if (dropVal === "Cheaper") {
      filteredProduct.sort((a, b) => (a.finalPrice ?? 0) - (b.finalPrice ?? 0));
    }

    const mappedProducts = filteredProduct.map((item) => ({
      ...item,
      price: typeof item.price === "number" ? item.price : Number(item.price) || 0,
      discount: typeof item.discount === "number" ? item.discount : Number(item.discount) || 0,
      finalPrice: typeof item.finalPrice === "number" ? item.finalPrice : Number(item.finalPrice) || 0,
    }));
    setProducts(mappedProducts);
    setCurrentPage(1);
    setStartPage(1);
  }

  // **Handlers**
  const handleValue = (val: string) => {
    setDropDownVal(val);
    filterSection(searchVal, val);
  };

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = e.target.value;
    setSearchVal(newVal);
    filterSection(newVal, dropDownVal);
  }

  return (
    <div className={styles.productMainContainer}>
      <div className={styles.filterSection}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="search"
            value={searchVal}
            onChange={(e) => handleSearch(e)}
          />
          <CiSearch />
        </div>
        <div>
          <DropDownSection
            priceFilterArr={priceFilterArr}
            dropDownVal={dropDownVal}
            handleValue={handleValue}
          />
        </div>
      </div>
      <div className={styles.ProductContainer}>
        {SlicedProductArr &&
          SlicedProductArr.map((item, index) => {
            return (
              <ProductItems
                item={item}
                index={startIndex + index}
                key={index}
              />
            );
          })}
      </div>
      // Pagination 
      <div className={styles.paginationContainer}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={styles.prevBtn}
        >
          <MdKeyboardArrowLeft />
        </button>

        //Show visible pages 
        <div className={styles.paginationPages}>
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={
                currentPage === page ? styles.activeBtn : styles.disActiveBtn
              }
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={styles.nextBtn}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}
 */

////////////////////////////////////////////
import React, { useEffect, useState, useMemo } from "react";
import ProductItems from "./ProductItems";
import styles from "../product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest } from "../../../sliceReducers/getComputerDataSlice";
import { CiSearch } from "react-icons/ci";
import DropDownSection from "./DropDownSection";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import type { RootState } from "../../../store/store";

export interface productsType {
  id: number;
  url: string;
  name: string;
  description: string;
  price: number;
  imgs?: string[];
  discount: number;
  finalPrice: number;
}
export interface filterArrType {
  label: string;
  value: string;
}

export default function Products() {
  const dispatch = useDispatch();

  const [searchVal, setSearchVal] = useState<string>("");
  const [dropDownVal, setDropDownVal] = useState<string>("Choose price");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(1);

  const visibleCard = 6;
  const showPagesNumber = 3;

  const priceFilterArr: filterArrType[] = [
    { label: "Cheaper", value: "Cheaper" },
    { label: "Expensive", value: "Expensive" },
  ];

  const productsData = useSelector((state: RootState) =>
    Array.isArray(state.computerData.computerData)
      ? state.computerData.computerData.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          discount: Number(item.discount) || 0,
          finalPrice: Number(item.finalPrice) || 0,
        }))
      : []
  );

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  // ✅ FILTERING HAPPENS HERE
  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];

    if (searchVal) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchVal.toLowerCase())
      );
    }

    if (dropDownVal === "Cheaper") {
      filtered.sort((a, b) => a.finalPrice - b.finalPrice);
    } else if (dropDownVal === "Expensive") {
      filtered.sort((a, b) => b.finalPrice - a.finalPrice);
    }

    return filtered;
  }, [productsData, searchVal, dropDownVal]);

  // ✅ PAGINATION
  const totalPages = Math.ceil(filteredProducts.length / visibleCard);
  const startIndex = (currentPage - 1) * visibleCard;
  const endIndex = startIndex + visibleCard;
  const SlicedProductArr = filteredProducts.slice(startIndex, endIndex);

  const getVisiblePages = () => {
    const endPage = Math.min(totalPages, startPage + showPagesNumber - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const visiblePages = getVisiblePages();

  const changePage = (page: number) => {
    setCurrentPage(page);
    if (page === visiblePages[visiblePages.length - 1] && page < totalPages) {
      setStartPage((prev) =>
        Math.min(prev + 1, totalPages - showPagesNumber + 1)
      );
    }
    if (page === visiblePages[0] && page > 1) {
      setStartPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setCurrentPage(1);
    setStartPage(1);
  };

  const handleValue = (val: string) => {
    setDropDownVal(val);
    setCurrentPage(1);
    setStartPage(1);
  };

  return (
    <div className={styles.productMainContainer}>
      <div className={styles.filterSection}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="search"
            value={searchVal}
            onChange={handleSearch}
          />
          <CiSearch />
        </div>
        <div>
          <DropDownSection
            priceFilterArr={priceFilterArr}
            dropDownVal={dropDownVal}
            handleValue={handleValue}
          />
        </div>
      </div>

      <div className={styles.ProductContainer}>
        {SlicedProductArr.map((item, index) => (
          <ProductItems item={item} index={startIndex + index} key={item.id} />
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={styles.prevBtn}
        >
          <MdKeyboardArrowLeft />
        </button>

        <div className={styles.paginationPages}>
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={
                currentPage === page ? styles.activeBtn : styles.disActiveBtn
              }
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={styles.nextBtn}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}
