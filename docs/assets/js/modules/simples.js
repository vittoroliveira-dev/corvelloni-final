// assets/js/modules/simples.js

// Dados do Simples Nacional (fallback caso o fetch falhe)
const SIMPLES_DATA = {
    "anexos": [
        {
            "id": "anexo-i",
            "titulo": "Anexo I — Comércio",
            "faixas": [
                { "faixa": 1, "rbt12": "Até R$ 180.000,00", "aliquota": 4.0, "pd": 0 },
                { "faixa": 2, "rbt12": "De R$ 180.000,01 a R$ 360.000,00", "aliquota": 7.3, "pd": 5940 },
                { "faixa": 3, "rbt12": "De R$ 360.000,01 a R$ 720.000,00", "aliquota": 9.5, "pd": 13860 },
                { "faixa": 4, "rbt12": "De R$ 720.000,01 a R$ 1.800.000,00", "aliquota": 10.7, "pd": 22500 },
                { "faixa": 5, "rbt12": "De R$ 1.800.000,01 a R$ 3.600.000,00", "aliquota": 14.3, "pd": 87300 },
                { "faixa": 6, "rbt12": "De R$ 3.600.000,01 a R$ 4.800.000,00", "aliquota": 19.0, "pd": 378000 }
            ]
        },
        {
            "id": "anexo-ii",
            "titulo": "Anexo II — Indústria",
            "faixas": [
                { "faixa": 1, "rbt12": "Até R$ 180.000,00", "aliquota": 4.5, "pd": 0 },
                { "faixa": 2, "rbt12": "De R$ 180.000,01 a R$ 360.000,00", "aliquota": 7.8, "pd": 5940 },
                { "faixa": 3, "rbt12": "De R$ 360.000,01 a R$ 720.000,00", "aliquota": 10.0, "pd": 13860 },
                { "faixa": 4, "rbt12": "De R$ 720.000,01 a R$ 1.800.000,00", "aliquota": 11.2, "pd": 22500 },
                { "faixa": 5, "rbt12": "De R$ 1.800.000,01 a R$ 3.600.000,00", "aliquota": 14.7, "pd": 85500 },
                { "faixa": 6, "rbt12": "De R$ 3.600.000,01 a R$ 4.800.000,00", "aliquota": 30.0, "pd": 720000 }
            ]
        },
        {
            "id": "anexo-iii",
            "titulo": "Anexo III — Serviços",
            "faixas": [
                { "faixa": 1, "rbt12": "Até R$ 180.000,00", "aliquota": 6.0, "pd": 0 },
                { "faixa": 2, "rbt12": "De R$ 180.000,01 a R$ 360.000,00", "aliquota": 11.2, "pd": 9360 },
                { "faixa": 3, "rbt12": "De R$ 360.000,01 a R$ 720.000,00", "aliquota": 13.5, "pd": 17640 },
                { "faixa": 4, "rbt12": "De R$ 720.000,01 a R$ 1.800.000,00", "aliquota": 16.0, "pd": 35640 },
                { "faixa": 5, "rbt12": "De R$ 1.800.000,01 a R$ 3.600.000,00", "aliquota": 21.0, "pd": 125640 },
                { "faixa": 6, "rbt12": "De R$ 3.600.000,01 a R$ 4.800.000,00", "aliquota": 33.0, "pd": 648000 }
            ]
        },
        {
            "id": "anexo-iv",
            "titulo": "Anexo IV — Serviços com CPP fora do DAS",
            "faixas": [
                { "faixa": 1, "rbt12": "Até R$ 180.000,00", "aliquota": 4.5, "pd": 0 },
                { "faixa": 2, "rbt12": "De R$ 180.000,01 a R$ 360.000,00", "aliquota": 9.0, "pd": 8100 },
                { "faixa": 3, "rbt12": "De R$ 360.000,01 a R$ 720.000,00", "aliquota": 10.2, "pd": 12420 },
                { "faixa": 4, "rbt12": "De R$ 720.000,01 a R$ 1.800.000,00", "aliquota": 14.0, "pd": 39780 },
                { "faixa": 5, "rbt12": "De R$ 1.800.000,01 a R$ 3.600.000,00", "aliquota": 22.0, "pd": 183780 },
                { "faixa": 6, "rbt12": "De R$ 3.600.000,01 a R$ 4.800.000,00", "aliquota": 33.0, "pd": 828000 }
            ]
        },
        {
            "id": "anexo-v",
            "titulo": "Anexo V — Serviços com Fator R",
            "faixas": [
                { "faixa": 1, "rbt12": "Até R$ 180.000,00", "aliquota": 15.5, "pd": 0 },
                { "faixa": 2, "rbt12": "De R$ 180.000,01 a R$ 360.000,00", "aliquota": 18.0, "pd": 4500 },
                { "faixa": 3, "rbt12": "De R$ 360.000,01 a R$ 720.000,00", "aliquota": 19.5, "pd": 9900 },
                { "faixa": 4, "rbt12": "De R$ 720.000,01 a R$ 1.800.000,00", "aliquota": 20.5, "pd": 17100 },
                { "faixa": 5, "rbt12": "De R$ 1.800.000,01 a R$ 3.600.000,00", "aliquota": 23.0, "pd": 62100 },
                { "faixa": 6, "rbt12": "De R$ 3.600.000,01 a R$ 4.800.000,00", "aliquota": 30.5, "pd": 540000 }
            ]
        }
    ]
};

const SELECTOR = '[data-simples-tabs]';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
});

const percentFormatter = v => `${Number(v).toFixed(2).replace('.', ',')}`;

function buildTable(anexo) {
    const table = document.createElement('table');
    table.classList.add('p-simples__table');

    const caption = document.createElement('caption');
    caption.textContent = anexo.titulo;
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    ['Faixa', 'Receita Bruta 12 meses (RBT12)', 'Alíquota nominal (%)', 'Parcela a deduzir (PD)']
        .forEach(label => {
            const th = document.createElement('th');
            th.scope = 'col';
            th.textContent = label;
            headRow.appendChild(th);
        });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    anexo.faixas.forEach(fx => {
        const tr = document.createElement('tr');

        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = `${fx.faixa}ª Faixa`;
        tr.appendChild(th);

        const tdRbt = document.createElement('td');
        tdRbt.textContent = fx.rbt12;
        tr.appendChild(tdRbt);

        const tdAliq = document.createElement('td');
        tdAliq.textContent = `${percentFormatter(fx.aliquota)}%`;
        tr.appendChild(tdAliq);

        const tdPd = document.createElement('td');
        tdPd.textContent = currencyFormatter.format(fx.pd);
        tr.appendChild(tdPd);

        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function populateTables(root, data) {
    if (!data?.anexos) return;

    root.querySelectorAll('[data-anexo]').forEach(holder => {
        const id = holder.getAttribute('data-anexo');
        const anexo = data.anexos.find(a => a.id === id);

        if (!anexo) {
            console.warn(`Anexo não encontrado: ${id}`);
            return;
        }

        holder.innerHTML = '';
        holder.appendChild(buildTable(anexo));
    });
}

function initTabs(root) {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    if (!tabs.length || !root.querySelector('[role="tabpanel"]')) return;

    const setActive = (nextTab, { focusTab = true } = {}) => {
        tabs.forEach(tab => {
            const active = tab === nextTab;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
            tab.tabIndex = active ? 0 : -1;

            const panelId = tab.getAttribute('aria-controls');
            const panel = panelId && root.querySelector(`#${panelId}`);
            if (panel) {
                panel.toggleAttribute('hidden', !active);
                panel.classList.toggle('is-active', active);
                if (active) panel.setAttribute('tabindex', '0');
                else panel.removeAttribute('tabindex');
            }
        });
        if (focusTab) nextTab.focus();
    };

    // Ativa a primeira tab ou a que estiver marcada como ativa
    setActive(tabs.find(t => t.getAttribute('aria-selected') === 'true') ?? tabs[0], { focusTab: false });

    // Clique nas tabs
    tabs.forEach(tab => tab.addEventListener('click', () => setActive(tab)));

    // Navegação por teclado
    root.addEventListener('keydown', e => {
        const cur = document.activeElement;
        if (!cur || cur.getAttribute('role') !== 'tab') return;
        const i = tabs.indexOf(cur);
        let n = i;

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                n = (i + 1) % tabs.length;
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                n = (i - 1 + tabs.length) % tabs.length;
                break;
            case 'Home':
                e.preventDefault();
                n = 0;
                break;
            case 'End':
                e.preventDefault();
                n = tabs.length - 1;
                break;
            default:
                return;
        }
        setActive(tabs[n]);
    });
}

/**
 * Carrega dados do JSON externo
 */
async function loadData(url, silent = false) {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            if (!silent) console.info(`JSON externo não encontrado (${res.status}), usando dados inline`);
            return null;
        }

        const contentType = res.headers.get('content-type');
        if (contentType && !contentType.includes('application/json')) {
            // Silenciosamente retorna null quando não é JSON
            return null;
        }

        const data = await res.json();
        console.log('✓ JSON carregado do servidor');
        return data;

    } catch (err) {
        // Silenciosamente retorna null em caso de erro
        return null;
    }
}

/**
 * Tenta carregar dados de várias fontes
 */
async function tryLoadData(root) {
    const attr = root.getAttribute('data-simples-url');

    // Primeiro tenta carregar do atributo ou caminho padrão (silenciosamente)
    if (attr) {
        const data = await loadData(attr, true);
        if (data) return data;
    }

    // Tenta o caminho padrão (silenciosamente)
    const defaultData = await loadData('/assets/data/simples-tabelas.json', true);
    if (defaultData) return defaultData;

    // Se falhou, usa os dados inline
    console.log('✓ Usando dados inline (fallback)');
    return SIMPLES_DATA;
}

/**
 * Inicializa o sistema de tabs do Simples Nacional
 */
async function initSimplesTabs() {
    const root = document.querySelector(SELECTOR);
    if (!root) {
        console.log('Elemento com data-simples-tabs não encontrado');
        return;
    }

    console.log('Inicializando tabs do Simples Nacional...');

    // Inicializa a funcionalidade de tabs imediatamente
    initTabs(root);

    // Carrega e popula os dados
    const data = await tryLoadData(root);

    if (!data || !data.anexos) {
        console.error('Estrutura de dados inválida');
        root.querySelectorAll('[data-anexo]').forEach(holder => {
            holder.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: #856404; background-color: #fff3cd; border: 1px solid #ffeeba; border-radius: 4px;">
                    <p>⚠️ Erro ao processar dados das tabelas</p>
                </div>
            `;
        });
        return;
    }

    console.log(`✓ Sistema inicializado com ${data.anexos.length} anexos`);
    populateTables(root, data);
}

// Inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimplesTabs, { once: true });
} else {
    initSimplesTabs();
}

// Exporta a função caso precise ser chamada manualmente
export { initSimplesTabs };
