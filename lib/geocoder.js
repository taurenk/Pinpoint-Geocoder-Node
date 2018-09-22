

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

function interpolateBySteps(coordinates, lfromhn, ltohn, rfromhn, rtohn) {}

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
  let rankedCandidates = rankAddrFeatResults(candidates, streetname, placeNumber, null, null, zipcode);
  console.log('ranked = ', rankedCandidates);
  let swap = geometryToCoordinates(rankedCandidates[0].st_astext);
  console.log(swap);
}

module.exports = {
  geocodeUSAddress,
};