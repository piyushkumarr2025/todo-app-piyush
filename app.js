/* To‑Do App – Piyush | Vanilla JS + LocalStorage */
(function(){
  const $ = (sel, ctx=document)=>ctx.querySelector(sel);
  const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

  const STORAGE_KEY = "todo.piyush.v1";
  let state = load();

  const els = {
    form: $("#task-form"),
    input: $("#task-input"),
    date: $("#task-date"),
    list: $("#task-list"),
    counts: $("#counts"),
    clearCompleted: $("#clear-completed"),
    exportBtn: $("#export-json"),
    importBtn: $("#import-json"),
    importFile: $("#import-file"),
    chips: $$(".chip"),
    search: $("#search"),
    template: $("#task-item-template")
  };

  let currentFilter = "all";

  // Helpers
  function uid(){ return Math.random().toString(36).slice(2,9) }
  function nowISO(){ return new Date().toISOString() }
  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function load(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { tasks: [] }; }
    catch(e){ return { tasks: [] }; }
  }
  function formatDate(iso){
    if(!iso) return "";
    const d = new Date(iso + (iso.length===10?'T00:00:00':''));
    return d.toLocaleDateString();
  }
  function counts(){
    const total = state.tasks.length;
    const completed = state.tasks.filter(t=>t.completed).length;
    const active = total - completed;
    els.counts.textContent = `${total} total • ${active} active • ${completed} completed`;
  }

  function render(){
    els.list.innerHTML = "";
    const q = els.search.value.trim().toLowerCase();
    state.tasks
      .filter(t => {
        if(currentFilter === "active" && t.completed) return false;
        if(currentFilter === "completed" && !t.completed) return false;
        if(q && !t.title.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a,b)=> (a.completed===b.completed) ? a.created.localeCompare(b.created) : a.completed - b.completed)
      .forEach(addTaskElement);
    counts();
  }

  function addTaskElement(task){
    const li = els.template.content.firstElementChild.cloneNode(true);
    li.dataset.id = task.id;
    if(task.completed) li.classList.add("completed");
    $(".toggle", li).checked = task.completed;
    $(".task-title", li).textContent = task.title;
    $(".due", li).textContent = task.due ? `Due: ${formatDate(task.due)}` : "";
    $(".ts", li).textContent = `Added: ${new Date(task.created).toLocaleString()}`;

    // Events
    $(".toggle", li).addEventListener("change", () => toggle(task.id));
    $(".delete", li).addEventListener("click", () => remove(task.id));
    $(".edit", li).addEventListener("click", () => edit(task.id));
    $(".task-title", li).addEventListener("keydown", (e)=>{
      if(e.key === "Enter"){ e.preventDefault(); edit(task.id); }
    });

    els.list.appendChild(li);
  }

  // CRUD
  function add(title, due){
    state.tasks.push({ id: uid(), title: title.trim(), due: due || "", completed:false, created: nowISO() });
    save(); render();
  }
  function toggle(id){
    const t = state.tasks.find(x=>x.id===id);
    if(!t) return;
    t.completed = !t.completed;
    save(); render();
  }
  function remove(id){
    state.tasks = state.tasks.filter(x=>x.id!==id);
    save(); render();
  }
  function edit(id){
    const t = state.tasks.find(x=>x.id===id);
    if(!t) return;
    const title = prompt("Update task title:", t.title);
    if(title===null) return;
    const due = prompt("Update due date (YYYY-MM-DD) or leave blank:", t.due || "");
    t.title = title.trim() || t.title;
    t.due = (due||"").trim();
    save(); render();
  }

  // Events
  els.form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = els.input.value.trim();
    if(!title) return;
    add(title, els.date.value);
    els.input.value = "";
    els.date.value = "";
    els.input.focus();
  });

  els.clearCompleted.addEventListener("click", ()=>{
    state.tasks = state.tasks.filter(t=>!t.completed);
    save(); render();
  });

  els.exportBtn.addEventListener("click", ()=>{
    const blob = new Blob([JSON.stringify(state,null,2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todo-data.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  els.importBtn.addEventListener("click", ()=> els.importFile.click());
  els.importFile.addEventListener("change", (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const data = JSON.parse(reader.result);
        if(!data.tasks) throw new Error("Invalid file");
        state = data;
        save(); render();
      }catch(err){
        alert("Import failed. Ensure it's a JSON exported from this app.");
      }
    };
    reader.readAsText(file);
  });

  // Filters
  els.chips.forEach(ch => ch.addEventListener("click", ()=>{
    els.chips.forEach(c=>c.classList.remove("active"));
    ch.classList.add("active");
    currentFilter = ch.dataset.filter;
    render();
  }));

  // Search
  els.search.addEventListener("input", render);

  // First paint
  render();
})();