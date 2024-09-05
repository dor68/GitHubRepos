using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;

namespace GitHubRepos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReposController : ControllerBase
    {
        const string BaseUrl = "https://api.github.com/search/repositories";
        const string UserAgent = "UserAgentTest";

        [HttpGet]
        [Authorize]
        public async Task<ActionResult> Get(string searchKeyword)
        {
            try
            {
                // init HttpClient obj and RequestHeaders
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(BaseUrl);
                client.DefaultRequestHeaders.Add("Accept", "application/json");
                client.DefaultRequestHeaders.Add("User-Agent", UserAgent);

                // retrieve  results from  Get request 
                HttpResponseMessage response = client.GetAsync("?q=" + searchKeyword).Result;

                // return results if success 
                if (response.IsSuccessStatusCode)
                {
                    var jsObj = JsonObject.Parse(response.Content.ReadAsStringAsync().Result);
                    return Ok(jsObj);
                }
                else
                {
                    // Handle the error condition
                    return StatusCode((int)response.StatusCode);
                }

            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return BadRequest(ex.Message);
            }


        }


    }
}
