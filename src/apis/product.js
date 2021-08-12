import queryString from 'query-string'
import { baseUrl } from './config'

const create = async (credentials, product, created) => {
  if(created)
    product.created = created
  try {
      let response = await fetch(`${baseUrl}/api/products`, {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
          },
          body: product
      })
        return response.json()
      }catch(err) {
        console.log(err)
  }
}

const read = async (productId) => {
  console.log('productId from function ' +  productId)
  try {
    let response = await fetch(`${baseUrl}/api/products/` + productId, {
      method: 'GET'
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

const update = async (productId, product, credentials) => {
  console.log('productId ' + productId)
  try {
    let response = await fetch(`${baseUrl}/api/products/`+productId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: product
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }

}

const remove = async (productId, credentials) => {
    try {
        let response = await fetch(`${baseUrl}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

const list = async (params) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch(`${baseUrl}/api/products?${query}`, {
      method: 'GET',
    })
    
    return response.json()
  }catch(err) {
    console.log(err)
  }
}

const listCategories = async () => {
  try {
    let response = await fetch(`${baseUrl}/api/products/categories`, {
      method: 'GET'
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  read,
  update,
  remove,
  listCategories,
  list
}