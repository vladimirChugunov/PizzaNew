import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import LoadingBloclk from "../components/PizzaBlock/LoadingBlock";
import Pagination from "../components/Pagination/Index";
import {
  setFilters,
  setCurrentPage,
  selectFilter,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizza } from "../redux/slices/pizzasSlice";
import { list } from "../components/Sort";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, isLoading } = useSelector(selectPizza);

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizza = async () => {
    // const page = categoryId < 1 ? `page=${currentPage}&limit=4` : ""; // ?page=${currentPage}&limit4&
    const categories = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue.length > 0 ? `&search=${searchValue}` : "";
    const sort = sortType.sortProperty;
    dispatch(
      fetchPizzas({
        categories,
        search,
        sort,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер, то создаем query параметры (добавляем в url)
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortType.sortProperty,
        categoryId,
        currentPage,
        search: searchValue.length > 0 ? `&search=${searchValue}` : "",
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage, navigate]);

  //Если был первый рендер,то проверяем параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sort);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);
  // Если был был первый рендер, то запиши выбранные парметры в url queryPsrams
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizza();
    }
    fetchPizza();
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <Pagination value={currentPage} onPageChange={onPageChange} />
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading === "error" ? (
          <div className="content__error-info">
            <h2>
              Страница пустая<span>😒</span>
            </h2>
            <p>
              К сожалению, не удалось получить пицы. Попробуйте обновиь
              страницу.
            </p>
          </div>
        ) : isLoading === "Loading" ? (
          [...new Array(6)].map((_, i) => <LoadingBloclk key={i} />)
        ) : (
          items.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />)
        )}
      </div>
    </div>
  );
};

export default Home;
