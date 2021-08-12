import { baseUrl } from './config'

const create = async (userId, credentials, products, total) => {
  try {
    let response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({
          "products": products,
          "user": userId,
          "total": total
      })
      })
      return response.json()
    }catch(err) {
      console.log(err)
    }
}

const remove = async (orderId, credentials) => {
  try {
      let response = await fetch(`${baseUrl}/api/order/${orderId}`, {
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

const listByShop = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/orders/shop/'+params.shopId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  }catch(err){
    console.log(err)
  }
}

const update = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/status/' + params.shopId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  } catch(err){
    console.log(err)
  }
}

const cancelProduct = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/'+params.shopId+'/cancel/'+params.productId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  }catch(err){
    console.log(err)
  }
}

const processCharge = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/order/'+params.orderId+'/charge/'+params.userId+'/'+params.shopId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(product)
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

const getStatusValues = async (signal) => {
  try {
    let response = await fetch('/api/order/status_values', {
      method: 'GET',
      signal: signal
    })
    return response.json()
  }catch(err) { 
    console.log(err)
  }
}

const listByUser = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${baseUrl}/api/orders/user/`+params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  }catch(err) {
    console.log(err)
  }
}

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/order/' + params.orderId, {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  listByShop,
  update,
  cancelProduct,
  processCharge,
  getStatusValues,
  listByUser,
  remove,
  read
}