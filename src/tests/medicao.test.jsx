/* Medição: só no site publicado, com o código do portfólio e sem dado pessoal */
import { deveMedir, GOATCOUNTER_URL, iniciarMedicao, registrarEvento } from '../utils/medicao';

const publicado = { producao: true, hostname: 'coin-wallet-app.netlify.app', automatizado: false };

afterEach(() => {
  delete window.goatcounter;
  document.head.innerHTML = '';
});

describe('medição com GoatCounter', () => {
  it('aponta para o código único do portfólio', () => {
    expect(GOATCOUNTER_URL).toBe('https://douglasabnovato.goatcounter.com/count');
  });

  it('mede só no build de produção, fora de localhost e de teste automatizado', () => {
    expect(deveMedir(publicado)).toBe(true);
    expect(deveMedir({ ...publicado, producao: false })).toBe(false);
    expect(deveMedir({ ...publicado, automatizado: true })).toBe(false);
    expect(deveMedir({ ...publicado, hostname: 'localhost' })).toBe(false);
  });

  it('não carrega o script nos testes', () => {
    expect(iniciarMedicao()).toBe(false);
    expect(document.querySelector('script[data-goatcounter]')).toBeNull();
  });

  it('o evento leva só o nome e não quebra sem o contador', () => {
    expect(() => registrarEvento('despesa-registrada')).not.toThrow();
    const count = vi.fn();
    window.goatcounter = { count };
    registrarEvento('despesa-registrada');
    expect(count).toHaveBeenCalledWith({ path: 'despesa-registrada', title: 'despesa-registrada', event: true });
  });
});
