from machine import Pin, PWM
from utime import sleep
from dht import DHT22

sensor_temp = DHT22(Pin(15))
led = PWM(Pin(16, Pin.OUT))

led.freq(1000)
led.duty_u16(0)

while True:
    # Diz ao sensor que ele iniciará/solicitará uma LEITURA
    sensor_temp.measure() #obrigatório
    # Leitura da TEMPERATURA
    temperatura = sensor_temp.temperature()
    
    if temperatura > 0 and temperatura < 20:
        led.duty_u16(230)
    
    elif temperatura > 20 and temperatura < 30:
        led.duty_u16(30000)
        
    elif temperatura > 30:
        led.duty_u16(65535)
    else:
        print("Algo deu errado")

    
    
    
    
    print("A temperatura é: ", temperatura)
    
    
    sleep(2)