// Varre jogos/*/index.html e gera games.json (lido pelo fliperama)
const fs = require('fs'), path = require('path');
const dir = 'jogos', out = [];
for (const pasta of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
  const p = path.join(dir, pasta);
  if (!fs.statSync(p).isDirectory() || !fs.existsSync(path.join(p, 'index.html'))) continue;
  let m = {};
  try { m = JSON.parse(fs.readFileSync(path.join(p, 'game.json'), 'utf8')); } catch (e) {}
  if (!m.imagem) {
    const f = ['preview.png','preview.jpg','preview.jpeg','preview.webp','preview.gif'].find(n => fs.existsSync(path.join(p, n)));
    if (f) m.imagem = f;
  }
  out.push({ pasta, nome: pasta.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), ordem: 999, ...m });
}
out.sort((a, b) => a.ordem - b.ordem || a.nome.localeCompare(b.nome));
fs.writeFileSync('games.json', JSON.stringify(out, null, 2) + '\n');
console.log(out.length + ' jogo(s) listado(s)');
