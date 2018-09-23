

function geometryToCoordinates(geometryField) {
  // MULTILINESTRING((-73.830061 40.950767,-73.829595 40.950445))
  let stringToParse = geometryField.replace('MULTILINESTRING((', '');
  stringToParse = stringToParse.replace('))', '');
  let coordinates = stringToParse.split(',');
  let ReversedCoordinates = [];
  coordinates.forEach((coordinate)=> {
    let parsedCoord = coordinate.split(' ');
    ReversedCoordinates.push([parsedCoord[1], parsedCoord[0]]);
  });
  return ReversedCoordinates;
}

function haversineDistance(latlngA, latlngB, isMiles) {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; // km

  const dLat = toRad(latlngB[1] - latlngA[1]);
  const dLatSin = Math.sin(dLat / 2);
  const dLon = toRad(latlngB[0] - latlngA[0]);
  const dLonSin = Math.sin(dLon / 2);

  const a = (dLatSin * dLatSin) +
            (Math.cos(toRad(latlngA[1])) * Math.cos(toRad(latlngB[1])) * dLonSin * dLonSin);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c;
  if (isMiles) distance /= 1.60934;
  return distance;
}

function interpolateCoordinates(coordinates, targetHouse, lfromhn, ltohn, rfromhn, rtohn) {
  
  let fromHouseNumber = lfromhn;
  let toHouseNumber = ltohn;
  // Make this dumb simple without picking sides. 
  if (targetHouse >= rfromhn) {fromHouseNumber = rfromhn; }
  if (targetHouse <= rtohn) { toHouseNumber= rtohn; }

  let totalMiles = 0;

}

function rankAddrFeatResults(results, streetname, targetNumber, city, state, zipcode) {
  results.forEach((result)=> {
    let score = 0;
    if (streetname === result.fullname) { score += 2; }
    if (zipcode === result.zipcode) { score += 2; }
    if (targetNumber) {
      if (parseInt(result.rfromhn) <= targetNumber && parseInt(result.rtohn) >= targetNumber) { score += 1; }
      if (parseInt(result.lfromhn) <= targetNumber && parseInt(result.ltohn) >= targetNumber) { score += 1; }
    }
    result.score = score;
  });
  results.sort(function(a, b){return b.score - a.score});
  return results;
}

async function geocodeUSAddress(db, streetname, placeNumber, city, state, zipcode, numberOfCandidates = 1) {
  let candidates = await db.findFeatureStrict(streetname, zipcode);
  if (candidates.length === 0) {
    return []; // TODO; maybe lets throw an error here or something.
  }
  let rankedCandidates = rankAddrFeatResults(candidates, streetname, placeNumber, null, null, zipcode);
  console.log('ranked = ', rankedCandidates);
  let swap = geometryToCoordinates(rankedCandidates[0].st_astext);
  console.log(swap);
}

module.exports = {
  geocodeUSAddress,
};