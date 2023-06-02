using System.Text;
using RabbitMQ.Client;

string fila_A = "FILA_A";
string fila_B = "FILA_B";
string fila_C = "FILA_C";
string exchange = "EXCHANGE_A_B_C";

ConnectionFactory factory = new ConnectionFactory
{
    HostName = "localhost",
    // Uri = new Uri("")
};

using (IConnection connection = factory.CreateConnection())
{
    IModel channel = SetupExchangeDirect(connection);
    while (true)
    {
        Thread.Sleep(1000);
        SendMessage(channel, "A_C");
        // SendMessage(channel, "B");
    }
}

IModel SetupExchangeDirect(IConnection connection)
{
    IModel channel = connection.CreateModel();

    // Dictionary<string, object> args = new Dictionary<string, object>();
    // args.Add("x-message-ttl", 15000);
    // args.Add("x-max-length", 15);
    // args.Add("x-expires", 20000);

    //Declarar as filas dentro do RabbitMQ
    channel.QueueDeclare(
        queue: fila_A,
        durable: false,
        exclusive: false,
        autoDelete: false,
        arguments: null
    );
    channel.QueueDeclare(
        queue: fila_B,
        durable: false,
        exclusive: false,
        autoDelete: false,
        arguments: null
    );
    channel.QueueDeclare(
        queue: fila_C,
        durable: false,
        exclusive: false,
        autoDelete: false,
        arguments: null
    );

    //Declarar os exchanges dentro do RabbitMQ - DIRECT
    // channel.ExchangeDeclare(
    //     exchange: exchange,
    //     type: ExchangeType.Direct
    // );
    channel.ExchangeDeclare(
        exchange: exchange,
        type: ExchangeType.Fanout
    );

    //Declarar o vínculo entre as filas e o exchange
    channel.QueueBind(
        queue: fila_A,
        exchange: exchange,
        routingKey: "A_C"
    );
    channel.QueueBind(
        queue: fila_B,
        exchange: exchange,
        routingKey: "B"
    );
    channel.QueueBind(
        queue: fila_C,
        exchange: exchange,
        routingKey: "A_C"
    );

    return channel;
}

void SendMessage(IModel channel, string routingKey)
{
    string texto = routingKey + " \t" + DateTime.Now.ToString("hh:mm:ss.fff");
    // string texto = JsonConvert.SerializeObject(objeto);
    byte[] mensagem = Encoding.UTF8.GetBytes(texto);

    channel.BasicPublish(
        body: mensagem,
        routingKey: routingKey,
        basicProperties: null,
        exchange: exchange
    );
    Console.WriteLine(texto);
}



