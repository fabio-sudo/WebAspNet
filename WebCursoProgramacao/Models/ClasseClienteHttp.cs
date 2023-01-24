using Newtonsoft.Json;
using System.Net.Http;

namespace WebCursoProgramacao.Models
{
    public class ClasseClienteHttp
    {
        //Método genérico retorna lista via HTTP
        public static async Task<List<T>> BuscarLista<T>(IHttpClientFactory _httpClientFactory, string url, string rota)
        {
            try { 

            var cliente = _httpClientFactory.CreateClient();
            cliente.BaseAddress = new Uri(url);
            string retornoJson = await cliente.GetStringAsync(rota);

            List <T> lista = JsonConvert.DeserializeObject<List<T>>(retornoJson);

            return lista;
           
            }
            catch (Exception ex)
            {

                return new List<T>();

            }
        }
       
        //Método genérico retorna objeto via HTTP
        public static async Task<T> Buscar<T>(IHttpClientFactory _httpClientFactory, string url, string rota) {

            try
            {

                var cliente = _httpClientFactory.CreateClient();

                cliente.BaseAddress = new Uri(url);
                string retornoJson = await cliente.GetStringAsync(rota);

                T lista = JsonConvert.DeserializeObject<T>(retornoJson);

                return lista;

            }
            catch (Exception ex)
            {

                return (T)Activator.CreateInstance(typeof(T));

            }

        }

        //Método genérico excluir objeto via HTTP
        public static async Task<int> Excluir(IHttpClientFactory _httpClientFactory, string url, string rota)
        {
            try
            {
                var cliente = _httpClientFactory.CreateClient();

                cliente.BaseAddress = new Uri(url);
              
                var resposta = await cliente.DeleteAsync(rota);

                if (resposta.IsSuccessStatusCode)
                {

                    string escreva = await resposta.Content.ReadAsStringAsync();
                    return int.Parse(escreva);

                }
                else
                {
                    return 0;

                }

            }
            catch (Exception ex) { return 0; };

        }

        //Método adiciona ou altera objeto via Http
        public static async Task<int> Adicionar<T>(IHttpClientFactory _httpClientFactory, string url, string rota, T obj)
        {
            try
            {
                var cliente = _httpClientFactory.CreateClient();

                cliente.BaseAddress = new Uri(url);
                var retorno = await cliente.PostAsJsonAsync<T>(rota, obj);
                if (retorno.IsSuccessStatusCode)
                {
                    string escreva = await retorno.Content.ReadAsStringAsync();
                    return int.Parse(escreva);

                }
                else {
                  
                    return 0;
                            
                }

            }
            catch (Exception ex) { return 0; }
        
        
        }


        //Método adiciona ou altera objeto via Http
        public static async Task<List<T>> AdicionarLista<T>(IHttpClientFactory _httpClientFactory, string url, string rota, T obj)
        {
            try
            {
                var cliente = _httpClientFactory.CreateClient();

                cliente.BaseAddress = new Uri(url);
                var retorno = await cliente.PostAsJsonAsync<T>(rota, obj);
                if (retorno.IsSuccessStatusCode)
                {
                    string escreva = await retorno.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<List<T>>(escreva);

                }
                else
                {

                    return new List<T>();

                }

            }
            catch (Exception ex) { return new List<T>(); }


        }


    }
    }
