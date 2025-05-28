function findCount(item, cart) {
  let obj = cart.find((object) => parseInt(object.id) === parseInt(item.id));
  if (obj) return obj.count;
  else return 0;
}

export function updateProductWithItsCount(products, cart) {
  let newArr = [];
  newArr = products.map((item) => {
    return {
      id: item.id,
      image: item.image,
     
      title: item.title,
      price: item.price,  
      category: item.category,  
    };
  });
  return newArr;
}
