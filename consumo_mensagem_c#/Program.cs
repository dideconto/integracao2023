using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Console.WriteLine(" ---- CONSUMIDOR ----");

ConnectionFactory factory = new ConnectionFactory
{
    HostName = "localhost"
};

using (var connection = factory.CreateConnection())
{
    using (var channel = connection.CreateModel())
    {
        channel.QueueDeclare(
            queue: "mensagens",
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null
        );

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += (model, message) =>
        {
            var body = message.Body.ToArray();
            var mensagem = Encoding.UTF8.GetString(body);
            Console.WriteLine(mensagem);
        };
        channel.BasicConsume(
            queue: "mensagens",
            autoAck: true,
            consumer: consumer
        );

        Console.ReadLine();
    }
}