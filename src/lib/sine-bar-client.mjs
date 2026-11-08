import { PRESETS, positive, stackHeight, angleDegrees, gradeAnswer, makeProblem, possibleMistake } from './sine-bar.mjs';

export function mountSineBar(root) {
  if (!root || root.dataset.mounted) return;
  root.dataset.mounted = 'true';
  const q = id => root.querySelector('#' + id);
  const explore = { length: null, angle: 30, label: '', formulaLength: '' };
  const practice = { problem: null, help: 0, revealed: false, counted: false, solved: 0, assisted: 0 };
  const fmt = n => n.toFixed(4);
  const tabs = [q('explore-tab'), q('solve-tab')];
  function activate(index, focus = false) {
    tabs.forEach((tab,i)=>{ tab.setAttribute('aria-selected', String(i===index)); tab.tabIndex=i===index?0:-1; q(i===0?'explore-panel':'solve-panel').hidden=i!==index; });
    if (index === 1 && !practice.problem) newProblem();
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>activate(i));
    tab.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();activate(e.key==='Home'?0:e.key==='End'?1:1-i,true);}});
  });
  function draw(angle, label, length, height) {
    // Uniform scale. Roll centers A/B are distance L apart, with Δy = H.
    const a = angle * Math.PI / 180, scale = 342, r = 20;
    const ax=90, ay=420, bx=ax+scale*Math.cos(a), by=ay-scale*Math.sin(a);
    const nx=-Math.sin(a), ny=-Math.cos(a);
    const ox=nx*48, oy=ny*48, dx=bx+76;
    const line = (x1,y1,x2,y2,c,w=1,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${dash?'stroke-dasharray="'+dash+'"':''}/>`;
    const text = (x,y,t,c='#f4efe6',anchor='middle')=>`<text x="${x}" y="${y}" fill="${c}" font-family="ui-monospace,monospace" font-size="26" text-anchor="${anchor}">${t}</text>`;
    const bar=[[-24,-14],[scale+24,-14],[scale+24,-38],[-24,-38]].map(([x,y])=>`${ax+x*Math.cos(a)+y*Math.sin(a)},${ay-x*Math.sin(a)+y*Math.cos(a)}`).join(' ');
    const arcx=ax+50*Math.cos(a), arcy=ay-50*Math.sin(a);
    let g=`<rect x="38" y="440" width="564" height="30" rx="2" fill="#303b33" stroke="#79837a"/><rect x="${bx-31}" y="${by+r}" width="62" height="${Math.max(.5,420-by)}" fill="#3c5657" stroke="#80c8e6"/><polygon points="${bar}" fill="url(#steel)" stroke="#c4d0ca"/>`;
    g+=line(ax,ay,bx,by,'#f0a43a',1.8,'6 5')+line(ax,ay,bx,ay,'#596658',1,'5 5')+line(bx,by,bx,ay,'#596658',1,'5 5');
    for(const [x,y] of [[ax,ay],[bx,by]]) g+=`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#steel)" stroke="#dae1db"/><circle cx="${x}" cy="${y}" r="3" fill="#f0a43a"/>`;
    g+=line(ax,ay,ax+ox*1.2,ay+oy*1.2,'#927946')+line(bx,by,bx+ox*1.2,by+oy*1.2,'#927946')+line(ax+ox,ay+oy,bx+ox,by+oy,'#f0a43a',1.5);
    for(const [x,y] of [[ax+ox,ay+oy],[bx+ox,by+oy]]) g+=line(x-4,y-7,x+4,y+7,'#f0a43a',1.5);
    g+=`<g transform="translate(${(ax+bx)/2+ox},${(ay+by)/2+oy}) rotate(${-angle})"><rect x="-105" y="-17" width="210" height="26" fill="#0c100e"/>${text(0,2,'L = '+label,'#f0a43a')}</g>`;
    g+=line(bx+33,by+r,dx+8,by+r,'#80c8e6')+line(bx+33,440,dx+8,440,'#80c8e6')+line(dx,by+r,dx,440,'#80c8e6',1.5)+text(dx+12,Math.min(428,(by+r+440)/2+6),'H','#80c8e6','start');
    g+=`<path d="M${ax+50} ${ay} A50 50 0 0 0 ${arcx} ${arcy}" stroke="#f0a43a" fill="none" stroke-width="2"/>`;
    // Angle value has a fixed, separate label below the plate; no tiny-angle collision.
    g+=text(90,506,'θ = '+angle+'°','#f0a43a','start')+text(575,506,'SURFACE PLATE','#a7a095','end');
    q('diagram-geometry').innerHTML=g;
    q('diagram-desc').textContent=`${label} roll-center distance at ${angle} degrees. Required stack height ${fmt(height)} inches. Both rolls are equal radius. The dimension L ends at the roll centerlines.`;
  }
  function invalidate(message) {
    explore.length=null;
    q('stack-output').innerHTML='— <span>in</span>';
    q('stack-formula').textContent='Check the selected bar size and angle.';
    q('explore-error').textContent=message;
    q('drawing-state').textContent='CHECK INPUT';
    q('diagram-geometry').innerHTML='<text x="320" y="250" fill="#aaa397" text-anchor="middle" font-size="20" font-family="system-ui">Choose a valid bar size and angle.</text>';
    q('diagram-desc').textContent='No calculated geometry is shown until valid inputs are chosen.';
  }
  function updateExplore() {
    q('custom-controls').hidden=q('bar-preset').value!=='custom';
    try {
      if(!q('bar-preset').value) {
        invalidate('');
        q('drawing-state').textContent='CHOOSE YOUR BAR';
        q('stack-formula').textContent='Choose the bar size before calculating.';
        return;
      }
      let length,label,formulaLength;
      if(q('bar-preset').value==='custom') {
        const value=positive(q('custom-length').value,'Custom bar size');
        const mm=q('custom-unit').value==='mm';
        length=mm?value/25.4:value; label=value+(mm?' mm':' in'); formulaLength=mm?`(${value} ÷ 25.4)`:String(value);
      } else {
        const preset=PRESETS.find(p=>p.id===q('bar-preset').value);
        length=preset.inches;label=preset.label;formulaLength=preset.id.endsWith('mm')?`(${preset.id.slice(0,-2)} ÷ 25.4)`:String(length);
      }
      const angle=positive(q('angle-input').value,'Angle');
      if(angle<1||angle>60) throw new RangeError('This Explore drawing supports angles from 1° to 60°.');
      const h=stackHeight(length,angle);
      if(h<.00005||h>99999) throw new RangeError('Choose a bar size whose stack can be shown from 0.0001 to 99999.0000 in.');
      Object.assign(explore,{length,angle,label,formulaLength});
      q('angle-slider').value=String(angle);
      q('stack-output').innerHTML=fmt(h)+' <span>in</span>';
      q('stack-formula').textContent=`${formulaLength} × sin(${angle}°) = ${fmt(h)} in`;
      q('explore-error').textContent='';q('drawing-state').textContent=label;
      draw(angle,label,length,h);
    } catch(e) {invalidate(e.message);}
  }
  for(const id of ['bar-preset','custom-unit'])q(id).addEventListener('change',updateExplore);
  for(const id of ['custom-length','angle-input'])q(id).addEventListener('input',updateExplore);
  q('angle-slider').addEventListener('input',()=>{q('angle-input').value=q('angle-slider').value;updateExplore();});
  function showFeedback(message,kind='info'){q('answer-feedback').textContent=message;q('answer-feedback').dataset.kind=kind;}
  function status(){q('practice-status').textContent=`${practice.solved} solved independently · ${practice.assisted} answers revealed. Explore and Solve keep separate state.`;}
  function newProblem(){
    practice.problem=makeProblem(q('problem-direction').value,practice.problem,explore.length?explore:null);
    practice.help=0;practice.revealed=false;practice.counted=false;
    const p=practice.problem, height=p.direction==='height';
    q('problem-question').textContent=height?'What stack height sets this angle?':'What angle does this stack set?';
    q('problem-given').innerHTML=`<div><dt>Roll-center distance</dt><dd>${p.bar.label}</dd></div><div><dt>${height?'Angle':'Stack height'}</dt><dd>${height?p.angle.toFixed(1)+'°':fmt(p.height)+' in'}</dd></div>`;
    q('precision').textContent=height?'Answer in inches, rounded to four decimal places.':'Answer in decimal degrees, rounded to the nearest hundredth.';
    q('answer-label').textContent=height?'Required stack height (in)':'Angle (decimal degrees)';
    q('answer').value='';q('answer').setAttribute('aria-invalid','false');
    q('help-content').hidden=true;q('help-content').textContent='';q('help-next').textContent='Hint';q('help-next').disabled=false;
    q('reveal-answer').disabled=false;showFeedback('Work from the setup shown above.');status();
  }
  function working(p){const l=p.bar.id.endsWith('mm')?`(${p.bar.id.slice(0,-2)} ÷ 25.4)`:String(p.bar.inches);return p.direction==='height'?`H = ${l} × sin(${p.angle.toFixed(1)}°) = ${p.expected.toFixed(4)} in`:`θ = asin(${fmt(p.height)} ÷ ${l}) = ${p.expected.toFixed(2)}°`;}
  q('new-problem').addEventListener('click',newProblem);
  q('problem-direction').addEventListener('change',newProblem);
  q('answer-form').addEventListener('submit',e=>{
    e.preventDefault(); const p=practice.problem;
    try{
      const answer=positive(q('answer').value,'Answer');
      if(p.direction==='angle'&&answer>=90)throw new RangeError('Angle must be greater than 0° and less than 90°.');
      if(p.direction==='height'&&answer>=p.bar.inches)throw new RangeError('Stack height must be less than the roll-center distance.');
      q('answer').setAttribute('aria-invalid','false');
      if(gradeAnswer(answer,p.expected,p.places)){
        if(!practice.revealed&&!practice.counted){practice.solved++;practice.counted=true;}
        showFeedback(practice.revealed?'Correct value. This setup remains marked as revealed, not independently solved.':p.direction==='height'?'Correct to four decimal places.':'Correct to the nearest hundredth of a degree.','success');
        q('help-content').hidden=false;q('help-content').textContent=working(p);status();
      }else{showFeedback('Not yet. '+possibleMistake(answer,p),'error');}
    }catch(error){q('answer').setAttribute('aria-invalid','true');showFeedback(error.message,'error');}
  });
  q('help-next').addEventListener('click',()=>{
    const p=practice.problem;
    const messages=p.direction==='height'?['The stack is opposite the angle. Use the roll-center distance as the hypotenuse. Check degree mode.','H = L × sin θ',working(p).split(' = ').slice(0,-1).join(' = ')]:['Divide the stack height by the roll-center distance. Then use inverse sine in degree mode.','θ = asin(H ÷ L)',working(p).split(' = ').slice(0,-1).join(' = ')];
    q('help-content').hidden=false;
    const para=document.createElement('p');para.textContent=messages[practice.help];q('help-content').append(para);
    practice.help++;q('help-next').textContent=['Hint','Show formula','Substitute values','All hints shown'][practice.help];q('help-next').disabled=practice.help>=3;
  });
  q('reveal-answer').addEventListener('click',()=>{
    if(!practice.counted&&!practice.revealed)practice.assisted++;
    if(!practice.counted)practice.revealed=true;
    q('help-content').hidden=false;q('help-content').textContent=working(practice.problem);
    showFeedback(practice.counted?'This setup was already solved independently.':`Answer revealed: ${practice.problem.expected.toFixed(practice.problem.places)}${practice.problem.direction==='height'?' in':'°'}. This does not count as independently solved.`);
    q('reveal-answer').disabled=true;status();
  });
  updateExplore();
}
