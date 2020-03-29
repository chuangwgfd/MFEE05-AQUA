import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators, $CombinedState } from 'redux'

import { getBlogDataAsync } from '../../actions/blog/blog_Actions'

import categoryData from './category'

import Header from '../../components/Header'
import Banner from '../../components/Banner'
// import Footer from '../../components/Footer'
import BlogRside from '../../components/blog/BlogRside'
import { Link } from 'react-router-dom'
import '../../style/Blog.scss'
import _ from 'lodash'
import RcViewer from '@hanyk/rc-viewer'
import Zoom from 'react-reveal/Zoom'
import sr from './ScrollReveal'
import $ from 'jquery'

function Blog(props) {

  function typeCategoryNameActive(event){
      //找到Zoom 移除標籤
    let categoryNameList =document.querySelectorAll('ul li')
      categoryNameList.forEach(value => {
        value.classList.remove('active-rao') //移除active
      })
      //找到Zoom a 移除標籤
    let categoryNameListA =document.querySelectorAll('ul li span')
    categoryNameListA.forEach(value => {
        value.classList.remove('active-rao') //移除active
      })
      ////為被點擊的目標新增active
      event.target.classList.add('active-rao') 
  }

  //向伺服器取得優惠券資料
  function getCategoryNameData(event) {
    const CategoryName_id = $('li').find('span.active-rao')
      ? $('li').find('span.active-rao').attr('data-type')
      : ''
      // console.log(CategoryName_id)

    props.getBlogDataAsync(CategoryName_id)
  }


  const options = {}

  const [blogData, setBlogData] = useState([])


  useEffect(() => {
    props.getBlogDataAsync()
  }, [])

  useEffect(() => {
    sr.reveal('.cardHover', {
      // origin: 'bottom',
      duration: 2000,
      delay: 100,
      distance: '500px',
    })
  }, [props.blogData])



  // console.log(props.blogData.result)

  return (
    <>
      <Header />
      <Banner BannerImgSrc="/./images/blog/banner.jpg" />
      <div className="container rao">
        {/* <!--category--> */}
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-center">
            <div className="category  ">
             
              <ul className="d-flex justify-content-center">
              <Zoom>
                <Link to="/blogadd" className="badge badge-pill  addPost">
                  發文
                </Link>
              </Zoom>
              <li  className="nav-item" onClick={event => {
                                                  typeCategoryNameActive(event)  
                                                  getCategoryNameData() 
                                                  event.stopPropagation()               
                                                }}>                        
                            <span   className="badge badge-pill categoryName nav-link"   data-type="">
                              全部
                            </span>
                          </li>
              {categoryData
                ? categoryData.map((value, index) => {
                    return (
                      <Zoom >
                          <li  className="nav-item" onClick={event => {
                                                  typeCategoryNameActive(event)  
                                                  getCategoryNameData() 
                                                  event.stopPropagation()               
                                                }}>                        
                            <span   className="badge badge-pill categoryName nav-link" key={index}  data-type={value.categoryName}>
                              {value.categoryName}
                            </span>
                          </li>
                      </Zoom>
                    )
                  })
                : ''}
                </ul>
            </div>
          </div>
        </div>
        {/* <!--card--> */}
        <div className="row justify-content-around">
          <div
            className=" col-md-8 rounded-lg d-flex
  justify-content-around cardContent"
          >
            <div className=" col-sm-6 lCard ">
              {props.blogData.result
                ? props.blogData.result.map((value, index) => {
                    
                  if (value.id % 2 === 0)
                  
                    return (
                      <div className="cardHover">
                      <div className="card  rounded-lg " key={index}>
                        <RcViewer>
                          <img
                            className="card-img-top rounded-top "
                            src={'http://localhost:5000/images/blogImg/'+ value.blogImages}
                            alt="image"

                          />
                        </RcViewer>
                        <div className="card-body">
                          <Link to={'/blog/' + value.id}>
                            <div className="author mb-3">
                              <Link to="">AUQA</Link> -
                              <time>{value.created_at.substring(0, 10)}</time>
                            </div>
                            <Link to={'/blog/' + value.id}>
                              <h1 className="card-title  mb-3">
                                {value.blogTitle}
                              </h1>
                            </Link>
                            <p className="card-text mb-3">
                              {value.blogContent.substring(0, 150) + '...'}
                            </p>
                          </Link>
                          <hr align="left" />
                          <div className="d-flex justify-content-around">
                            <div className="card-tag d-flex justify-content-center">
                              <Link to={'/blog/' + value.id}>
                                {value.tagName1}
                              </Link>
                              、<Link to="">{value.tagName2}</Link>
                            </div>
                            <div className="comment">
                              <i className="far fa-comment">1</i>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    )
                  })
                : ''}
              {/* <!--rCard--> */}
            </div>
            <div className="col-md-6 rCard">
              {props.blogData.result
                ? props.blogData.result.map((value, index) => {
                    if (value.id % 2 === 1)
                      return (
                        <div className="cardHover">
                        <div className="card  rounded-lg ">
                          <RcViewer options={options}>
                            <img
                              className="img-fluid rounded-top "
                              src={'http://localhost:5000/images/blogImg/'+ value.blogImages}
                              alt=" image "
                            />
                          </RcViewer>
                          <div className="card-body">
                            <div className="author mb-3">
                              <Link to="">AUQA</Link> -
                              <time>{value.created_at.substring(0, 10)}</time>
                            </div>
                            <Link to={'/blog/' + value.id}>
                              <h1 className="card-title  mb-3">
                                {value.blogTitle}
                              </h1>
                            </Link>
                            <p className="card-text ">
                              {value.blogContent.substring(0, 250) + '...'}
                            </p>
                            <hr align="left" />
                            <div className="d-flex justify-content-around">
                              <div className="card-tag">
                                <Link to="">{value.tagName1}</Link>、
                                <Link to="">{value.tagName2}</Link>
                              </div>
                              <div className="comment">
                                <i className="far fa-comment">1</i>{' '}
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      )
                  })
                : ''}
            </div>
          </div>
          {/* <!--rSide--> */}
          <BlogRside blogData={props.blogData} />
        </div>
      </div>
    </>
  )
}

// 取得Redux中store的值
const mapStateToProps = store => {
  return {
    blogData: store.blogReducer.blogData,
  }
}

// 指示dispatch要綁定哪些action creators
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBlogDataAsync }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog)
