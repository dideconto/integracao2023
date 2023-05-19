using System.Text;
using Newtonsoft.Json;
using RabbitMQ.Client;

ConnectionFactory factory = new ConnectionFactory
{
    HostName = "localhost",
    // Uri = new Uri("")
};

using (IConnection connection = factory.CreateConnection())
{
    using (IModel channel = connection.CreateModel())
    {
        channel.QueueDeclare(
            queue: "mensagens",
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null
        );

        dynamic objeto = new
        {
            Nome = "Diogo",
            Sobrenome = "Deconto"
        };

        while (true)
        {
            string texto = DateTime.Now.ToString();
            // string texto = JsonConvert.SerializeObject(objeto);
            byte[] mensagem = Encoding.UTF8.GetBytes(texto);

            Thread.Sleep(1000);
            channel.BasicPublish(
                body: mensagem,
                routingKey: "mensagens",
                basicProperties: null,
                exchange: ""
            );
            Console.WriteLine("Mensagem enviado com sucesso!");
        }

    }
}
Console.ReadKey();