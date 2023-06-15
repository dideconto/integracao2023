using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace consumo_mensagens_api_c_.Services;


//builder.Services.AddHostedService<RabbitMQService>();

public class RabbitMQService : BackgroundService
{
    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        ConnectionFactory factory = new ConnectionFactory
        {
            HostName = "localhost"
        };
        var connection = factory.CreateConnection();

        var channel = connection.CreateModel();

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += (model, message) =>
        {
            var body = message.Body.ToArray();
            var mensagem = Encoding.UTF8.GetString(body);
            Console.WriteLine(mensagem);
        };
        channel.BasicConsume(
            queue: "FILA",
            autoAck: true,
            consumer: consumer
        );
        return Task.CompletedTask;


    }
}