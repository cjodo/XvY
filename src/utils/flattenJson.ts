//Returns a flattened json string with nested keys as prefixes.. ex car: { make: honda, model: accord } >> { car.make: honda, car.model: accord }

export const flattenJson = (json: JSON | string) => {
  let ret;

  if(typeof json == "string"){
    ret = JSON.parse(json)
  } else {
    ret = json;
  }

  console.log(ret)
}
