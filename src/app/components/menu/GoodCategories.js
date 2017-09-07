import React, { PropTypes } from 'react'
import axios from 'axios'
import StatusDiv from '../StatusDiv'
import Goods from './Goods'
import { GST_API_URL } from '../../constants/Endpoints'

export default class GoodCategories extends React.Component {

  state = {
    data: [],
    status: '',
    categories: {}
  }

  fetchCategories = () => {
    const {data} = this.state
    
    this.setState({data: [], status: 'busy'})
    axios.get(GST_API_URL + '/api/v1/categories')
    .then(response => {
      const data = response.data
      if(data.length > 0) {
        let categoryObj = {}
        data.forEach(function (rl) {
          categoryObj[rl.id] = {
            status: '',
            goods: []
          }
        })
        this.setState({data, status: 'success', categories: categoryObj})
        this.props.scrollToBottom()
      } else {
        this.setState({data, status: 'nr'})
      }
    })
    .catch(function (error) {
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
    axios.get(GST_API_URL + '/api/v1/categories/' + categoryId + '/goods')
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
    .catch(function (error) {
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
    if(status == 'busy') {
      return <StatusDiv headerText='Loading...' subHeadText='' />
    } else if (status == 'nr') {
      return <StatusDiv headerText='Whoops!' subHeadText="We couldn't find any results." />
    } else if (status == 'error') {
      return <StatusDiv headerText='Something went wrong!' subHeadText="An unexpected error has occurred." />
    } else if (status == 'success') {
      return <div className='results goods'>
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
    }
    return <div></div>
  }
}

GoodCategories.propTypes = {

}