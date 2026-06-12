from machine import Pin
from utime import sleep
from dht import DHT22

sensor_temp = DHT22(Pin(15))

while True:
    # Diz ao sensor que ele iniciará/solicitará uma LEITURA
    sensor_temp.measure()
    
    # Leitura da UMIDADE
    umidade = sensor_temp.humidity()
    
    
    # Leitura da TEMPERATURA
    temperatura = sensor_temp.temperature()
    
    print("A umidade é: ", umidade)
    print("A temperatura é: ", temperatura)
    
    
    sleep(2)