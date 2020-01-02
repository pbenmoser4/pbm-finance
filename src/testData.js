export function generateStockData(){
  const startDate = new Date(2010, 0, 1);
  const startValue = 100.00;
  const endValue = 200.00;
  const stepSize = 1000 * 60 * 60 * 24;
  const steps = 2500;
  const v = new Date(startDate.getTime() + (stepSize * steps))

  const arr = [];

  for (let v = 0; v < steps; v++){
    arr.push(randNorm())
  }

  const scaleVal = Math.max(startValue, endValue) / Math.min(startValue, endValue);
  const noiseSize = 2500;

  const noise = arr.map((val, i, arr) => {
    const startIndex = i-Math.round(noiseSize/2) > 0 ? i-Math.round(noiseSize/2) : 0;
    const endIndex = i+Math.round(noiseSize/2) < arr.length ? i+Math.round(noiseSize/2) : arr.length-1;
    const valArr = arr.slice(startIndex, endIndex);
    return valArr.reduce((accumulator, currentValue, index, array) => {
      let centerPoint = Math.round(array.length / 2);
      let scaleFactor = scaleVal * ((index - centerPoint) / array.length);
      return accumulator + (currentValue * scaleFactor);
    });
  });

  const retArr = noise.map((val, i) => {
    let date = new Date(startDate.getTime() + (stepSize * i));
    let value = (startValue + ((endValue - startValue) / steps) * i) + val;
    value = Number.parseFloat(value).toFixed(2);
    return {"date": date.toISOString(), "close": value}
  });

  return retArr;
}

function randNorm() {
  let u = 0, v = 0;
  while(u===0) u = Math.random();
  while(v===0) v = Math.random();
  return Math.sqrt( -2.0 * Math.log(u) ) * Math.cos( 2.0 * Math.PI * v);
}

export const stockData = {

}
