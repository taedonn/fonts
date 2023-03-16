import { useEffect } from 'react';
import '../css/Main.css';

const dummyText = '모든 국민은 성별·종교 또는 사회적 신분에 의하여 정치적, 경제적, 사회적, 문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.';

function dataInitHead(item) {
  for(let i = 0; i < item.length; i++) {
    document.head.innerHTML += '<link rel="stylesheet" href="'+item[i].c[5].v+'"/>'
  }
}

function dataInit(item, name) {
  document.getElementsByClassName(name)[0].innerHTML = '';

  for(let i = 0; i < item.length; i++) {
      document.getElementsByClassName(name)[0].innerHTML += 
      '<div class="font_box">'
        +'<div class="font_name">'+item[i].c[1].v+'</div>'
        +'<div class="font_text" style="font-family:'+item[i].c[2].v+';">'+dummyText+'</div>'
      +'</div>'
  }

  if(item.length % 2 === 0) { document.getElementsByClassName(name)[0].innerHTML += '<div class="font_box_empty">' }
}

function dataInitSide(item, name) {
  document.getElementsByClassName(name)[0].innerHTML = '';

  for(let i = 0; i < item.length; i++) {
    document.getElementsByClassName(name)[0].innerHTML += '<div class="font_name">'+item[i].c[1].v+'</div>'
  }
}

function dataFetch(sheetId, sheetName) {
  let base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  let query = encodeURIComponent('Select A,B,C,D,E,F');
  let url = `${base}&sheet=${sheetName}&tq=${query}`;

  fetch(url)
      .then(res => res.text())
      .then(rep => {
          // JSON만 추출
          let jsonData = JSON.parse(rep.substring(47).slice(0, -2));
          let jsonItem = jsonData.table.rows;
          dataInitHead(jsonItem);
          dataInit(jsonItem, 'font_area_wrap');
          dataInitSide(jsonItem, 'font_list');
      })
}
dataFetch('1ryt-0PI5_hWA3AnP0gcyTRyKh8kqAooApts_cI0yhQ0','fonts');

function Main() {
  useEffect(() => {
    // 브라잇 모드 / 나잇 모드
    document.body.classList.add('bright_mode');
  })

  const textChange = (e) => {
    let textArea = document.getElementsByClassName('font_text');
    for(let i = 0; i < textArea.length; i++) {
      textArea[i].innerText = e.target.value;
    }
  }

  const fontWeightChange = (e) => {
    let textArea = document.getElementsByClassName('font_text');
    for(let i = 0; i < textArea.length; i++) {
      textArea[i].style.fontWeight = e.target.value;
    }
  }

  return (
    <>
        <div className='wrap'>
            <div className='side_menu'>
              <div className='title'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/>
                </svg>
              </div>
              <div className='search_bar'>
                <input type='text' placeholder='Search Fonts'/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
              <div className='font_list'></div>
            </div>
            <div className='main_menu'>
              <div className='search_bar'>
                <input type='text' placeholder='Type Something' onChange={textChange} defaultValue={dummyText}/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/>
                </svg>
              </div>
              <div className='category'>
                <div className='category_1'>
                  <input type='checkbox' id='serif' defaultChecked/>
                  <label htmlFor='serif'>Serif</label>
                  <input type='checkbox' id='sansSerif' defaultChecked/>
                  <label htmlFor='sansSerif'>Sans Serif</label>
                  <input type='checkbox' id='handWriting' defaultChecked/>
                  <label htmlFor='handWriting'>Hand Writing</label>
                </div>
                <div className='divider'></div>
                <div className='category_2'>
                  <input type='radio' onChange={fontWeightChange} name='fontWeight' id='light' value='300'/>
                  <label htmlFor='light'>Light</label>
                  <input type='radio' onChange={fontWeightChange} name='fontWeight' id='regular' value='400' defaultChecked/>
                  <label htmlFor='regular'>Regular</label>
                  <input type='radio' onChange={fontWeightChange} name='fontWeight' id='medium' value='500'/>
                  <label htmlFor='medium'>Medium</label>
                  <input type='radio' onChange={fontWeightChange} name='fontWeight' id='bold' value='700'/>
                  <label htmlFor='bold'>Bold</label>
                  <input type='radio' onChange={fontWeightChange} name='fontWeight' id='black' value='900'/>
                  <label htmlFor='black'>Black</label>
                </div>
              </div>
              <div className='font_area_wrap'></div>
            </div>
        </div>
    </>
  );
}

export default Main;