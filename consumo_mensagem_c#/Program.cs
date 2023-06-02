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
        ConsumirFila(channel, "FILA_A", ConsoleColor.Blue);
        ConsumirFila(channel, "FILA_B", ConsoleColor.Cyan);
        ConsumirFila(channel, "FILA_C", ConsoleColor.Red);
        Console.ReadLine();
    }
}

void ConsumirFila(IModel channel, string fila, ConsoleColor cor)
{
    var consumer = new EventingBasicConsumer(channel);
    consumer.Received += (model, message) =>
    {
        var body = message.Body.ToArray();
        var mensagem = Encoding.UTF8.GetString(body);
        Console.ForegroundColor = cor;
        Console.WriteLine(mensagem);
    };
    channel.BasicConsume(
        queue: fila,
        autoAck: true,
        consumer: consumer
    );
}