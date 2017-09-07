import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import StatusDiv from '../StatusDiv'
import Goods from './Goods'
import { gstApiUrl } from '../../constants/Endpoints'

export default class GoodCategories extends React.Component {

  state = {
    data: [],
    status: '',
    categories: {}
  }

  fetchCategories = () => {
    const {data} = this.state
    const {scrollToBottom} = this.props
    this.setState({data: [], status: 'busy'})
    
    axios.get(gstApiUrl + '/api/v1/categories')
    .then(response => {
      const data = response.data
      if(data.length > 0) {
        let categoryObj = {}
        data.forEach(rl => {
          categoryObj[rl.id] = {
            status: '',
            goods: []
          }
        })
        this.setState({data, status: 'success', categories: categoryObj})
        scrollToBottom()
      } else {
        this.setState({data, status: 'nr'})
      }
    })
    .catch(error => {
      this.setState({data, status: 'error'})
    })
  }

  fetchGoods = (categoryId) => {
    let {categories} = this.state
    categories[categoryId] = {
      status: 'busy',
      goods: []
    }
    this.setState({categories})

    axios.get(gstApiUrl + '/api/v1/categories/' + categoryId + '/goods')
    .then(response => {
      const data = response.data
      if(data.length > 0) {
        categories[categoryId] = {
          status: 'success',
          goods: data  
        }
        this.setState({categories})
      } else {
        categories[categoryId] = {
          status: 'nr',
          goods: []  
        }
        this.setState({categories})
      }
    })
    .catch(error => {
      categories[categoryId] = {
        status: 'nr',
        goods: []  
      }
      this.setState({categories})
    })
  }

  componentWillMount () {
    this.fetchCategories()
  }

  render() {
    const {data, status, categories} = this.state
    return(
      <div>
        { // busy
          (status == 'busy') && (<StatusDiv headerText='Loading...' subHeadText='' />)
        }
        { // nr
          (status == 'nr') && (<StatusDiv headerText='Whoops!' subHeadText="We couldn't find any results." />)
        }
        { // error
          (status == 'error') && (<StatusDiv headerText='Something went wrong!' subHeadText="An unexpected error has occurred." />)
        }
        { // success
          (status == 'success') && (
            <div className='results goods'>
              {
                data.map((row, index) => {
                  return (
                    <div key={row.id} className='link-row'>
                      <a className='name' onClick={this.fetchGoods.bind(this, row.id)}>{index+1}. {row.name}</a>
                      <Goods data={categories[row.id]} />
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

GoodCategories.propTypes = {
  scrollToBottom: PropTypes.func
}