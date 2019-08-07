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
        html.push(detailView(name, details, id));
        $('.detail-view').append(html);
      }
      );
  }
  
  
  var listView = function(id, name, description, pic) {
  return `
  <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
  <div class="card-body">
  <h2 class="card-title"><a href="index.html?id=${id}">${name}</a> </h2>
  <p class="card-text">${description}</p>
  </div>
    ${pic?`<img src="${pic[0].url}">` : ``}
  </div>
  `;
  }
  

  var detailView = function(name, details) {
    return `
    <h1>${name}</h1>
    <p>${details}</p>
    `;
  }
  
  var id = getParameterByName('id');
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }