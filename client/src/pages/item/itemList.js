import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getItemDataAsync,
  getAsideDataAsync,
} from '../../actions/item/item_Actions'

import { cateData } from './itemType'
import '../../style/CW_items.scss'
// import { userRegisterAsync } from '../actions/index'

//引入元件
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import Aside from '../../components/item/Aside'
import Pages from '../../components/item/Pages'
// import Loading from '../../components'
// import Breadcrumb from '../../components/item/Breadcrumb'
import ItemCard from '../../components/item/ItemCard'

function Items(props) {
  // console.log(props)
  const [itemData, setItemData] = useState([])
  const [asideData, setAsideData] = useState([])
  const [hasloading, setHasLoading] = useState(false)
  console.log('cateData', cateData)

  useEffect(() => {
    props.getItemDataAsync()
    props.getAsideDataAsync()
  }, [])

  useEffect(() => {
    setHasLoading(true)

    setTimeout(() => {
      if (props.itemData.status) {
        setItemData(props.itemData.result)
        setHasLoading(false)
      }
    }, 500)
  }, [props.itemData])

  useEffect(() => {
    setHasLoading(true)

    setTimeout(() => {
      if (props.asideData.status) {
        setAsideData(props.asideData.asideData)
        setHasLoading(false)
      }
    }, 500)
  }, [props.asideData])

  function getItemData(page) {
    const type = document.querySelector('.typeMenu .active')
      ? document.querySelector('.typeMenu .active').getAttribute('data-type')
      : ''
    const brand = document.querySelector('.typeMenu .active')
      ? document.querySelector('.typeMenu .active').getAttribute('data-level')
      : ''
    //取得sort的select的值
    const price = document.querySelector('select[name="sort"]').value
    props.getClassDataAsync(type, brand, price, page)

    // props.getItemDataAsync(page)
  }

  // function getAsideData(page) {
  //   props.getAsideDataAsync(page)
  // }

  // const getItemData = page => {
  //   const category = document.querySelector('select[name="type"]').value
  //   const brand = document.querySelector('select[name="sort"]').value
  //   const price = document.querySelector('input.searchInput').value
  //   props.getItemDataAsync(page)
  // }

  console.log(props.asideData)
  return (
    <>
      <Header />
      <Banner BannerImgSrc="/images/ClassBanner.jpg" />
      <div className="container CW">
        <div className="row CW-itemList">
          <div className="col-3 aside d-none d-md-block">
            <Aside
              cateData={cateData}
              asideData={asideData}
              getDataFromServer={getItemData}
              // asideList={props.asideData}
            />
          </div>
          <div className="col-md-9 list">
            <div className="row justify-content-between list-header">
              <div className="col">{/* <Breadcrumb /> */}</div>

              <div className="col text-right d-flex justify-content-end">
                <form className="form-inline">
                  <label className="my-1 mr-2" htmlFor="item-sort">
                    排序方式
                  </label>
                  <select className="custom-select my-1 mr-sm-2" id="item-sort">
                    <option>依價格高至低</option>
                    <option value="1">依價格低至高</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </form>
              </div>
            </div>
            <div className="row list-wrapper">
              {hasloading ? <h1>載入中</h1> : <ItemCard itemData={itemData} />}
            </div>
            <div className="row list-page">
              {hasloading ? (
                ''
              ) : (
                <Pages
                  totalPages={props.itemData.totalPages}
                  getDataFromServer={getItemData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// 取得Redux中store的值
const mapStateToProps = store => {
  return {
    itemData: store.itemReducer.itemData,
    asideData: store.itemReducer.asideData,
  }
}

// 指示dispatch要綁定哪些action creators
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getItemDataAsync, getAsideDataAsync }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)