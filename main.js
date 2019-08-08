function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
  

  var getAllRecords = function() {
    $.getJSON('https://api.airtable.com/v0/appCatwkfE8QG6viG/Dnd?api_key=key5vrI98mjjHKl3L',
    function(airtable){
      var html = [];
      $.each(airtable.records, function(index, record) {
        var id = record.id;
        var name = record.fields['Name'];
        var description = record.fields['Descriptions'];
        var pic = record.fields['Pic'];
        html.push(listView(id, name, description, pic));
      });
      $('.list-view').append(html);
    }
    );
  }

  var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/appCatwkfE8QG6viG/Dnd/${id}?api_key=key5vrI98mjjHKl3L`,
    function(record){
        var html = [];
        var name = record.fields['Name'];
        var details = record.fields['Details'];
        var photos = record.fields['Photos'];
        var modetails = record.fields['MoreDetails'];
        var ccp3 = record.fields['CCP3'];
        var ccp4 = record.fields['CCP4'];
        var ccp5 = record.fields['CCP5'];
        html.push(detailView(name, details, photos, modetails, ccp3, ccp4, ccp5, id));
        $('.detail-view').append(html);
      }
      );
  }
  
  
  var listView = function(id, name, description, pic) {
  return `
  <div class="card bg-dark mb-3" style="max-width: 18rem;">
    <div class="card-body">
      <h2 class="card-title"><a href="index.html?id=${id}">${name}</a> </h2>
      <p class="card-text">${description}</p>
    </div>
  ${pic?`<img src="${pic[0].url}">` : ``}
  </div>
  `;
  }
  

  var detailView = function(name, details, photos, modetails, ccp3, ccp4, ccp5) {
    return `
    <div id="dv" class="card bg-dark mb-3" style="max-width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${details}</p>
        <p class="2nd-card-text">${modetails}</p>
        <p class="3rd-card-text">${ccp3}</p>
        <p class="4th-card-text">${ccp4}</p>
        <p class="5th-card-text">${ccp5}</p>
      </div>
      <div class="pictures">
      ${photos?`<img src="${photos[0].url}">` : ``}
      </div>
    </div>
    `;
  }
  
  var id = getParameterByName('id');
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }