from machine import Pin
from utime import sleep
from dht import DHT22

sensor_temp = DHT22(Pin(15))
bot = Pin(16, Pin.IN)

ultimo_estado = 0
modo = 0

while True:
    sensor_temp.measure()
    
    estado_atual = bot.value()
     
     
    if estado_atual == 1 and ultimo_estado == 0:
        modo += 1
        sleep(0.2)
        if modo > 1:
            modo = 0
        print (modo)
    
    if modo == 0:
        temperatura = sensor_temp.temperature()
        print ("A temperatura é: ", temperatura)
    
    if modo == 1:
        umidade = sensor_temp.humidity()
        print("A umidade é: ", umidade)
        
    ultimo_estado = estado_atual
    
    sleep(0.01)
    